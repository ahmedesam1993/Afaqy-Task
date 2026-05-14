import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  //============Locators============
  readonly page:          Page;
  readonly nameInput: Locator;
  readonly userEmailInput: Locator;
  readonly signupButton:   Locator;
  //============Constructor============
  constructor(page: Page) {
    this.page          = page;
    this.nameInput = page.locator('//input[@data-qa="signup-name"]');
    this.userEmailInput = page.locator('//input[@data-qa="signup-email"]');
    this.signupButton   = page.locator('//button[@data-qa="signup-button"]');
  }
  //============Methods============
  //============Actions============

  async signup(name: string, email: string): Promise<void> {
    await this.page.waitForURL('**/login', { timeout: 30000 });
    await this.nameInput.fill(name);
    await this.userEmailInput.fill(email);
    await this.signupButton.click();
    
  }
  //============Assertions============
  async assertPageLoaded(): Promise<void> {
    await expect(this.nameInput).toBeVisible();
    await expect(this.userEmailInput).toBeVisible();
    await expect(this.signupButton).toBeVisible();
  }
}
