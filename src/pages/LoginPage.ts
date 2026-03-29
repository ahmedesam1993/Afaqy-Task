import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page:          Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton:   Locator;

  constructor(page: Page) {
    this.page          = page;
    this.usernameInput = page.locator('//input[@name="username"]');
    this.passwordInput = page.locator('//input[@name="password"]');
    this.loginButton   = page.locator('//button[@type="submit"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/web/index.php/auth/login');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/web/index.php/dashboard/index', { timeout: 30000 });
  }

  async assertPageLoaded(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}
