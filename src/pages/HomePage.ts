import { Page, Locator, expect } from '@playwright/test';

export class HomePage {

    //============Locators============

  readonly page:                  Page;
  readonly signupOrLoginButton:             Locator;
  readonly logoutButton:                  Locator;
  readonly deleteButton:                  Locator;
  readonly loggedInUsernameText:             Locator;

  constructor(page: Page) {
      //============Constructor============

    this.page                 = page;
    this.signupOrLoginButton            = page.getByText(' Signup / Login'); 
    this.logoutButton           = page.getByText(' Logout');
    this.deleteButton           = page.getByText(' Delete Account');
    this.loggedInUsernameText           = page.locator('body');
  }

    //============Methods============
  //============Actions============
async goto(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async clickSignupOrLogin(): Promise<void> {
    await this.signupOrLoginButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

   //============Assertions============
  
  async assertPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle('Automation Exercise');
  }

  async assertUserLoggedIn(userName: string): Promise<void> {
    await expect(this.logoutButton).toBeVisible();
    await expect(this.deleteButton).toBeVisible();
    await expect(this.page.locator('body')).toContainText(`Logged in as ${userName}`);
  }

  async assertUserLoggedOut(): Promise<void> {
await expect(this.page.url()).toContain('/login');
    await expect(this.signupOrLoginButton).toBeVisible();
  }
}