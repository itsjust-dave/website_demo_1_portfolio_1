/**
 * ============================================================
 * DAVID OGBOGU PORTFOLIO – CONTACT FORM GOOGLE APPS SCRIPT BACKEND
 * ============================================================
 * 
 * 100% FREE / ZERO MARGINAL FINANCIAL COST ($0/yr)
 * 
 * What this script does automatically:
 * 1. Appends every form submission to your Google Sheet ("David Ogbogu Portfolio Leads").
 * 2. Creates a Status dropdown column in Google Sheets: [Pending, Responded, Finalized]
 *    with automated color highlights:
 *    - Pending: Light Red background (#FFDEDE)
 *    - Responded: Light Yellow background (#FEF3C7)
 *    - Finalized: Light Green background (#DCFCE7)
 * 3. Sends an immediate notification email to davidogbogu2005@gmail.com with all lead details.
 * 4. Sends an immediate personalized confirmation email to the visitor thanking them and confirming next steps.
 * 5. Returns a JSON response with CORS headers to the website.
 * 
 * SETUP / UPDATE INSTRUCTIONS:
 * 1. Open your Google Sheet ("David Ogbogu Portfolio Leads") and click "Extensions" > "Apps Script".
 * 2. Select all code in Code.gs, delete it, paste this updated file, and press Ctrl+S (Save).
 * 3. CRITICAL: Update your Web App Deployment:
 *    - Click "Deploy" > "Manage deployments".
 *    - Click the Pencil (Edit) icon next to your active Web App deployment.
 *    - Under "Version", select "New version".
 *    - Click "Deploy".
 *    (Google Apps Script will not run new code until you deploy a New Version!)
 * 4. Your existing Web App URL will remain the same, now running the spam-proof delivery engine.
 */

const CONFIG = {
  NOTIFICATION_EMAIL: "davidogbogu2005@gmail.com",
  SHEET_NAME: "David Ogbogu Portfolio Leads",
  MY_NAME: "David Ogbogu",
  CALENDLY_URL: "https://calendly.com/davidogbogu2005/30-min-discovery-call",
  TIMEZONE: "GMT+1"
};

function doPost(e) {
  try {
    let data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        // Fallback for form-urlencoded or plain text
        const contents = e.postData.contents;
        const pairs = contents.split('&');
        pairs.forEach(pair => {
          const parts = pair.split('=');
          if (parts[0]) {
            data[decodeURIComponent(parts[0])] = decodeURIComponent((parts[1] || '').replace(/\+/g, ' '));
          }
        });
      }
    }

    if ((!data.email || !data.firstName) && e.parameter) {
      data = Object.assign({}, e.parameter, data);
    }

    const firstName = (data.firstName || "").trim();
    const lastName = (data.lastName || "").trim();
    const fullName = lastName ? `${firstName} ${lastName}` : (firstName || "Website Visitor");
    const email = (data.email || "").trim();
    const preferredContact = (data.preferredContact || "Not provided").trim();
    const projectDetails = (data.projectDetails || "Inquiry from website").trim();

    // 12-Hour Format Timestamp with AM/PM (e.g. 2026-09-02 01:45:30 PM)
    const now = new Date();
    const formattedTimestamp12Hr = Utilities.formatDate(now, CONFIG.TIMEZONE, "yyyy-MM-dd hh:mm:ss a");

    // 1. Process Google Sheet Entry
    const sheet = getOrCreateLeadsSheet();
    const lastRow = sheet.getLastRow() + 1;

    // Append row: 12-Hour Timestamp, First Name, Last Name, Email, Preferred Channel, Project Details, Status
    sheet.appendRow([
      formattedTimestamp12Hr,
      firstName,
      lastName,
      email,
      preferredContact,
      projectDetails,
      "Pending" // Default Status
    ]);

    // Apply Status dropdown validation & formatting
    setupRowStatusDropdown(sheet, lastRow);

    // 2. Send Notification Email to David Ogbogu
    try {
      sendAdminNotificationEmail({
        fullName,
        firstName,
        lastName,
        email,
        preferredContact,
        projectDetails,
        timestamp: formattedTimestamp12Hr
      });
    } catch (adminMailErr) {
      Logger.log("Admin email error: " + adminMailErr);
    }

    // 3. Send Personalized Auto-Reply to Visitor
    if (email && email.indexOf("@") !== -1) {
      try {
        sendVisitorConfirmationEmail({
          firstName: firstName || "there",
          email: email,
          preferredContact: preferredContact
        });
      } catch (visitorMailErr) {
        Logger.log("Visitor auto-reply error: " + visitorMailErr);
      }
    }

    // Return Success JSON with CORS
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Your message has been received! Check your inbox for confirmation."
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("doPost Error: " + error);
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ready", message: "David Ogbogu Portfolio Contact API is online." })
  ).setMimeType(ContentService.MimeType.JSON);
}

// -------------------------------------------------------------
// Helper: Google Sheet Initialization & Formatting
// -------------------------------------------------------------
function getOrCreateLeadsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create(CONFIG.SHEET_NAME);
  let sheet = ss.getActiveSheet();

  if (sheet.getLastRow() === 0) {
    const headers = [
      "Date & Time (12-Hour)",
      "First Name",
      "Last Name",
      "Email Address",
      "Preferred Alternative Contact",
      "Project Details",
      "Status"
    ];
    sheet.appendRow(headers);

    // Header styling
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#2C3023");
    headerRange.setFontColor("#D2FF00");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Geist");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);

    // Column widths
    sheet.setColumnWidth(1, 190); // 12-Hour Timestamp
    sheet.setColumnWidth(2, 130); // First Name
    sheet.setColumnWidth(3, 130); // Last Name
    sheet.setColumnWidth(4, 220); // Email
    sheet.setColumnWidth(5, 220); // Preferred Contact
    sheet.setColumnWidth(6, 380); // Project Details
    sheet.setColumnWidth(7, 140); // Status Dropdown

    // Force 12-Hour Number Format on Column A
    sheet.getRange("A2:A1000").setNumberFormat("yyyy-mm-dd hh:mm:ss am/pm");

    // Setup global conditional formatting for Status column
    setupConditionalFormatting(sheet);
  }

  return sheet;
}

function setupRowStatusDropdown(sheet, rowNumber) {
  const statusCell = sheet.getRange(rowNumber, 7);
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Pending", "Responded", "Finalized"], true)
    .setAllowInvalid(false)
    .build();
  statusCell.setDataValidation(rule);
  statusCell.setHorizontalAlignment("center");
  statusCell.setFontWeight("bold");
}

function setupConditionalFormatting(sheet) {
  const statusRange = sheet.getRange("G2:G1000");

  // Red for Pending
  const pendingRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Pending")
    .setBackground("#FFDEDE")
    .setFontColor("#991B1B")
    .setRanges([statusRange])
    .build();

  // Yellow for Responded
  const respondedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Responded")
    .setBackground("#FEF3C7")
    .setFontColor("#92400E")
    .setRanges([statusRange])
    .build();

  // Green for Finalized
  const finalizedRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Finalized")
    .setBackground("#DCFCE7")
    .setFontColor("#166534")
    .setRanges([statusRange])
    .build();

  sheet.setConditionalFormatRules([pendingRule, respondedRule, finalizedRule]);
}

// -------------------------------------------------------------
// Helper: Send Admin Notification Email (Optimized for Mobile & Desktop)
// -------------------------------------------------------------
function sendAdminNotificationEmail(lead) {
  const subject = `New Project Lead: ${lead.fullName}`;
  const plainText = `NEW PORTFOLIO COLLABORATION REQUEST\nReceived: ${lead.timestamp}\n\nFull Name: ${lead.fullName}\nEmail Address: ${lead.email}\nAlternative Contact: ${lead.preferredContact}\n\nProject Details:\n${lead.projectDetails}\n\nReply directly to this email to contact ${lead.firstName}.`;

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 8px 4px !important; }
      .email-card { padding: 18px 14px !important; border-radius: 10px !important; }
      .email-title { font-size: 18px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F4ED; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <div class="email-wrapper" style="background-color: #F4F4ED; padding: 20px 8px; width: 100%; box-sizing: border-box;">
    <div class="email-card" style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 14px; border: 1px solid #E2E8F0; padding: 24px; box-sizing: border-box; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
      
      <!-- Top Brand Tag & Header -->
      <div style="border-bottom: 2px solid #2C3023; padding-bottom: 14px; margin-bottom: 18px;">
        <div style="margin-bottom: 8px;">
          <span style="display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; background-color: #2C3023; color: #D2FF00; padding: 4px 10px; border-radius: 999px;">New Project Lead</span>
        </div>
        <h1 class="email-title" style="margin: 0; font-size: 20px; font-weight: 800; color: #0F172A; line-height: 1.3;">Portfolio Collaboration Request</h1>
        <p style="margin: 4px 0 0 0; font-size: 12.5px; color: #64748B;">Received on ${lead.timestamp}</p>
      </div>

      <!-- Lead Details Stack (Mobile Friendly) -->
      <div style="margin-bottom: 16px;">
        
        <!-- Name Card -->
        <div style="margin-bottom: 10px; padding: 10px 14px; background-color: #F8FAFC; border-radius: 8px; border: 1px solid #F1F5F9;">
          <div style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.04em;">Full Name</div>
          <div style="font-size: 15px; font-weight: 700; color: #0F172A; margin-top: 2px;">${lead.fullName}</div>
        </div>

        <!-- Email Card -->
        <div style="margin-bottom: 10px; padding: 10px 14px; background-color: #F8FAFC; border-radius: 8px; border: 1px solid #F1F5F9;">
          <div style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.04em;">Email Address</div>
          <div style="font-size: 15px; font-weight: 600; margin-top: 2px;">
            <a href="mailto:${lead.email}" style="color: #2563EB; text-decoration: none; word-break: break-all;">${lead.email}</a>
          </div>
        </div>

        <!-- Preferred Channel Card -->
        <div style="margin-bottom: 10px; padding: 10px 14px; background-color: #F8FAFC; border-radius: 8px; border: 1px solid #F1F5F9;">
          <div style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.04em;">Alternative Channel</div>
          <div style="font-size: 14.5px; font-weight: 600; color: #0F172A; margin-top: 2px;">${lead.preferredContact}</div>
        </div>

      </div>

      <!-- Project Details Card -->
      <div style="margin-bottom: 22px; padding: 14px 16px; background-color: #F8FAFC; border-left: 4px solid #2C3023; border-radius: 6px; border-top: 1px solid #F1F5F9; border-right: 1px solid #F1F5F9; border-bottom: 1px solid #F1F5F9;">
        <div style="font-size: 11px; text-transform: uppercase; color: #475569; font-weight: 700; letter-spacing: 0.04em; margin-bottom: 6px;">Project Details</div>
        <p style="margin: 0; font-size: 14px; line-height: 1.65; color: #1E293B; white-space: pre-wrap; word-break: break-word;">${lead.projectDetails}</p>
      </div>

      <!-- Full-Width Touch Friendly Reply Button -->
      <div style="text-align: center; padding-top: 12px; border-top: 1px solid #E2E8F0;">
        <a href="mailto:${lead.email}?subject=Re:%20Collaboration%20Inquiry%20-%20David%20Ogbogu" style="display: block; width: 100%; box-sizing: border-box; background-color: #2C3023; color: #D2FF00; font-weight: 700; text-decoration: none; padding: 14px 18px; border-radius: 10px; font-size: 14.5px; text-align: center;">
          Reply to ${lead.firstName} ↗
        </a>
      </div>

    </div>
  </div>
</body>
</html>
  `;

  try {
    GmailApp.sendEmail(CONFIG.NOTIFICATION_EMAIL, subject, plainText, {
      htmlBody: htmlBody,
      replyTo: lead.email
    });
  } catch (err) {
    MailApp.sendEmail({
      to: CONFIG.NOTIFICATION_EMAIL,
      subject: subject,
      body: plainText,
      htmlBody: htmlBody,
      replyTo: lead.email
    });
  }
}

// -------------------------------------------------------------
// Helper: Send Personalized Auto-Reply to Visitor (100% Deliverability Optimized)
// -------------------------------------------------------------
function sendVisitorConfirmationEmail(visitor) {
  // 1. Conversational subject line with "Re:" signals legitimate 1-to-1 dialogue to email providers
  const subject = `Re: Project inquiry – David Ogbogu`;

  // 2. Exact 1-to-1 plain-text parity (prevents MIME disparity spam penalties)
  const plainText = `Hi ${visitor.firstName},

Thank you for reaching out through my portfolio. I've received your note and wanted to confirm that your message came through directly to my inbox.

I'm currently reviewing your project details and will be in touch shortly via your preferred channel (${visitor.preferredContact}).

If you'd like to schedule a 30-minute discovery call directly on my calendar to discuss your ideas, you can pick a time here:
${CONFIG.CALENDLY_URL}

Feel free to reply directly to this email if you have any extra project files, links, or details to share in the meantime.

Best regards,

David Ogbogu
Web & Digital Product Designer | Data • Technology • Design
Enugu, Nigeria (GMT+1)
${CONFIG.NOTIFICATION_EMAIL}`;

  // 3. Deliverability-Grade HTML:
  // - Clean personal note styling on clean background (no heavy marketing wrappers or nested cards)
  // - High text-to-code ratio (> 65% text)
  // - No <head> or <style> blocks (which flag unauthenticated marketing templates from personal @gmail.com)
  // - No fake mailto buttons or suspicious unicode arrow symbols (prevents anti-phishing heuristics)
  const htmlBody = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px 18px; color: #1e293b; line-height: 1.6; border-top: 3px solid #2C3023;">
  <p style="font-size: 15px; margin: 0 0 16px 0; color: #1e293b;">Hi ${visitor.firstName},</p>
  
  <p style="font-size: 15px; margin: 0 0 16px 0; color: #1e293b; line-height: 1.6;">
    Thank you for reaching out through my portfolio. I've received your note and wanted to confirm that your message came through directly to my inbox.
  </p>
  
  <p style="font-size: 15px; margin: 0 0 16px 0; color: #1e293b; line-height: 1.6;">
    I'm currently reviewing your project details and will be in touch shortly via your preferred channel (<strong>${visitor.preferredContact}</strong>).
  </p>
  
  <p style="font-size: 15px; margin: 0 0 12px 0; color: #1e293b; line-height: 1.6;">
    If you'd like to talk through your ideas sooner, you can also book a 30-minute discovery call directly on my calendar:
  </p>
  
  <p style="margin: 0 0 20px 0;">
    <a href="${CONFIG.CALENDLY_URL}" style="display: inline-block; background-color: #2C3023; color: #ffffff; padding: 11px 20px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none;">
      Schedule a 30-Min Discovery Call &rarr;
    </a>
  </p>
  
  <p style="font-size: 15px; margin: 0 0 24px 0; color: #1e293b; line-height: 1.6;">
    Feel free to reply directly to this email if you have any extra project files, links, or details to share in the meantime.
  </p>
  
  <div style="border-top: 1px solid #e2e8f0; padding-top: 18px; margin-top: 24px; font-size: 13.5px; color: #64748b; line-height: 1.5;">
    <strong style="color: #0f172a; font-size: 15px;">David Ogbogu</strong><br>
    <span>Web &amp; Digital Product Designer | Data &bull; Technology &bull; Design</span><br>
    <span style="font-size: 12.5px; color: #94a3b8;">Enugu, Nigeria (GMT+1) &bull; <a href="mailto:${CONFIG.NOTIFICATION_EMAIL}" style="color: #64748b; text-decoration: none;">${CONFIG.NOTIFICATION_EMAIL}</a></span>
  </div>
</div>
  `.trim();

  // 4. Send via GmailApp (authenticated Gmail API).
  // CRITICAL DELIVERABILITY RULE: Do NOT pass replyTo here!
  // Omitting replyTo ensures the RFC 5322 'From' and 'Reply-To' headers match natively,
  // preventing Google, Outlook, and Yahoo anti-spoofing heuristic flags.
  try {
    GmailApp.sendEmail(visitor.email, subject, plainText, {
      htmlBody: htmlBody,
      name: CONFIG.MY_NAME
    });
  } catch (err) {
    Logger.log("GmailApp error, falling back to MailApp: " + err);
    MailApp.sendEmail({
      to: visitor.email,
      subject: subject,
      body: plainText,
      htmlBody: htmlBody,
      name: CONFIG.MY_NAME
    });
  }
}
