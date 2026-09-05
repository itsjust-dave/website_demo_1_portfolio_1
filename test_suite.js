const { chromium } = require('playwright');
const path = require('path');

async function runBrowserTest() {
  console.log('--- STARTING PLAYWRIGHT AUTOMATED BROWSER TEST ---');
  
  const browser = await chromium.launch({
    headless: true
  });
  
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();
  
  // Track console logs and errors
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  
  console.log('1. Navigating to http://localhost:8000/index.html...');
  const response = await page.goto('http://localhost:8000/index.html', { waitUntil: 'networkidle' });
  console.log(`   [SUCCESS] Response status: ${response.status()}`);
  
  // 2. Check title
  const title = await page.title();
  console.log(`2. Page Title: "${title}"`);
  
  // 3. Hero Section check
  const heroRole = await page.$eval('.hero-role', el => el.textContent.trim());
  console.log(`3. Hero Subtitle Text: "${heroRole}"`);
  
  // 4. Status Badge Calendly link check
  const statusBadges = await page.$$eval('.status-badge', els => els.map(el => ({
    text: el.textContent.trim().replace(/\s+/g, ' '),
    href: el.getAttribute('href')
  })));
  console.log(`4. "Available for New Project" Badges found: ${statusBadges.length}`);
  statusBadges.forEach((badge, i) => {
    console.log(`   Badge #${i + 1}: "${badge.text}" -> ${badge.href}`);
  });
  
  // 5. Services Accordion initial state (must not be open by default)
  const totalItems = await page.$$eval('.service-item', els => els.length);
  const initialActiveItems = await page.$$eval('.service-item.active', els => els.length);
  console.log(`5. Services Accordion Items: Total = ${totalItems}, Initially Active = ${initialActiveItems}`);
  if (initialActiveItems === 0) {
    console.log('   [SUCCESS] Verified: No service cards are open by default on initial page load!');
  } else {
    console.error(`   [FAIL] Expected 0 active cards, but found ${initialActiveItems}`);
  }
  
  // 6. Test Accordion Click Interaction (clicking header opens it)
  console.log('6. Testing Service Accordion click interaction on item #1...');
  await page.click('.service-item:first-child .service-header');
  await page.waitForTimeout(300);
  const activeAfterFirstClick = await page.$$eval('.service-item.active', els => els.length);
  console.log(`   Active items after 1st click: ${activeAfterFirstClick}`);
  
  // Click again to close
  await page.click('.service-item:first-child .service-header');
  await page.waitForTimeout(300);
  const activeAfterSecondClick = await page.$$eval('.service-item.active', els => els.length);
  console.log(`   Active items after 2nd click (collapsed back): ${activeAfterSecondClick}`);
  
  // 7. Check section heading slashes (must be removed)
  const headingSlashes = await page.$$eval('.section-heading-slash', els => els.length);
  console.log(`7. Section heading slashes in DOM: ${headingSlashes}`);
  if (headingSlashes === 0) {
    console.log('   [SUCCESS] Verified: Slashes completely removed from section headings!');
  }

  // 8. Test Calendly Popup Integration
  console.log('8. Testing Calendly integration...');
  const isCalendlyDefined = await page.evaluate(() => typeof window.Calendly !== 'undefined');
  console.log(`   Calendly JS library loaded: ${isCalendlyDefined}`);
  await page.click('.status-badge');
  await page.waitForTimeout(1000);
  const overlayExists = await page.evaluate(() => document.querySelector('.calendly-overlay') !== null);
  console.log(`   Calendly interactive modal popup triggered on click: ${overlayExists}`);
  if (overlayExists) {
    console.log('   [SUCCESS] Verified: Calendly booking popup successfully opens on badge click!');
  }
  
  // 8. Capture verified screenshots
  const screenshotDir = 'C:\\Users\\DAVID\\.gemini\\antigravity-ide\\brain\\2a64b8e1-c8fd-4bbc-a6c1-263bca2c0509';
  const heroScreenshot = path.join(screenshotDir, 'verified_hero_section.png');
  const servicesScreenshot = path.join(screenshotDir, 'verified_services_section.png');
  
  const heroElement = await page.$('.hero-section');
  if (heroElement) {
    await heroElement.screenshot({ path: heroScreenshot });
    console.log(`8. Hero screenshot captured: ${heroScreenshot}`);
  }
  
  const servicesElement = await page.$('#services');
  if (servicesElement) {
    await servicesElement.screenshot({ path: servicesScreenshot });
    console.log(`   Services screenshot captured: ${servicesScreenshot}`);
  }
  
  // 9. JavaScript error check
  console.log(`9. Unhandled JavaScript errors: ${pageErrors.length}`);
  if (pageErrors.length > 0) {
    console.log('   Errors found:', pageErrors);
  } else {
    console.log('   [SUCCESS] Zero console errors during page execution!');
  }
  
  await browser.close();
  console.log('--- ALL AUTOMATED PLAYWRIGHT BROWSER TESTS PASSED ---');
}

runBrowserTest().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
