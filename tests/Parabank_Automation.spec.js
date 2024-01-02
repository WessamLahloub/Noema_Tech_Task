const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Test Case AC-01
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  const userNameSelector = '//*[@id="loginPanel"]/form/div[1]/input';
  const passwordSelector = '//*[@id="loginPanel"]/form/div[2]/input';
  const loginButtonSelector = '//*[@id="loginPanel"]/form/div[3]/input';

  // Input username and password
  await page.locator(userNameSelector).type('Wessam');
  await page.locator(passwordSelector).type('123');

  // Click on the login button
  await page.locator(loginButtonSelector).click();

  // Wait for the success message element
  const successLoginMessageSelector = '//*[@id="rightPanel"]/p';
  await page.waitForSelector(successLoginMessageSelector);

  // Get the text content of the success message
  const successLoginMessageText = await page.locator(successLoginMessageSelector).textContent();

  // Assert that the expected message is present
  const chai = await import('chai');
  const { expect } = chai;
  expect(successLoginMessageText).to.include('Your account was created successfully. You are now logged in.');

  // Close the browser
  await browser.close();
})();
