import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page:            Page;
  readonly userDropdownTab: Locator;
  readonly userDisplayName: Locator;
  readonly logoutLink:      Locator;
  readonly adminMenuItem:   Locator;
  readonly EmployeeMenuItem:     Locator;

  constructor(page: Page) {
    this.page            = page;
    this.userDropdownTab = page.locator('.oxd-userdropdown-tab');
    this.userDisplayName = page.locator('.oxd-userdropdown-name');
    this.logoutLink      = page.locator('a.oxd-userdropdown-link').filter({ hasText: 'Logout' });
    this.adminMenuItem   = page.locator('a.oxd-main-menu-item').filter({ hasText: 'Admin' });
    this.EmployeeMenuItem= page.locator('a.oxd-main-menu-item').filter({ hasText: 'PIM' });
  }

  async navigateToAdmin(): Promise<void> {
    await this.adminMenuItem.click();
    await this.page.waitForURL('**/viewSystemUsers', { timeout: 30000 });
  }

  async navigateToEmployee(): Promise<void> {
    await this.EmployeeMenuItem.click();
    await this.page.waitForURL('**/viewEmployeeList', { timeout: 30000 });
  }

  async logout(): Promise<void> {
    await this.userDropdownTab.click();
    await this.logoutLink.waitFor({ state: 'visible' });
    await this.logoutLink.click();
    await this.page.waitForURL('**/auth/login', { timeout: 30000 });
  }

  async getLoggedInUsername(): Promise<string> {
    return (await this.userDisplayName.innerText()).trim();
  }

  async assertOnDashboard(): Promise<void> {
    await expect(this.page).toHaveURL(/dashboard\/index/);
  }

  async assertLoggedOut(): Promise<void> {
    await expect(this.page).toHaveURL(/auth\/login/);
  }
}
