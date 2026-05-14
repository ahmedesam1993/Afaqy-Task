import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import { PageObjectManager } from '../pages/PageObjectManager';
import { buildNewUserData , buildCompleteUserData }
 from '../data/testData';



  test.describe.serial(
    `Register, Login, and Logout Flow for Automation Practice Website - Using Page Object Model and Data-Driven Testing with TypeScript and Playwright`,
    () => {
      let context:        BrowserContext;
      let page:           Page;
      let pageObjectManager: PageObjectManager;


      test.beforeAll(async ({ browser }: { browser: Browser }) => {
        context         = await browser.newContext();
        page            = await context.newPage();
        pageObjectManager       = new PageObjectManager(page);
      });

      test.afterAll(async () => {
        await context.close();
      });

      test('TC-001 | Register and validate the registered user logged in', async () => {
        await pageObjectManager.getHomePage().goto();
        await pageObjectManager.getHomePage().assertPageTitle();
        await pageObjectManager.getHomePage().clickSignupOrLogin();
        await pageObjectManager.getLoginPage().assertPageLoaded();
        await pageObjectManager.getLoginPage().signup(buildNewUserData().name, buildNewUserData().email);
        await pageObjectManager.getRegisterationInfoPage().assertPageLoaded();
        const userData = buildCompleteUserData();
        await pageObjectManager.getRegisterationInfoPage().completeSignUp(userData);
        await pageObjectManager.getRegisterationInfoPage().assertAccountCreated();
        await pageObjectManager.getRegisterationInfoPage().clickContinueButton();
        await pageObjectManager.getHomePage().assertUserLoggedIn(buildNewUserData().name);
  });

      test('TC-002 | Logout the logged-in user and validate logout', async () => {


        await pageObjectManager.getHomePage().logout();
        await pageObjectManager.getHomePage().assertUserLoggedOut();
        
    });
    

      });

