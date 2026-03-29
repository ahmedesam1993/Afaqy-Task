import { Page, Locator, expect } from '@playwright/test';

export class AdminPage {
  readonly page:                Page;
  readonly addButton:           Locator;
  readonly openSearchForm:      Locator;
  readonly searchUsernameInput: Locator;
  readonly searchButton:        Locator;
  readonly tableRows:           Locator;
  readonly deleteButton:        Locator;
  readonly deleteConfirmButton: Locator;

  constructor(page: Page) {
    this.page                 = page;
    this.addButton            = page.locator("//*[text()=' Add ']");
    this.openSearchForm       = page.locator("//i[@class='oxd-icon bi-caret-down-fill']");
    this.searchUsernameInput  = page.locator("//label[text()='Username']/following::input[@class='oxd-input oxd-input--active']");
    this.searchButton         = page.locator("//button[@type='submit']");
    this.tableRows            = page.locator("//div[contains(@class,'oxd-table-body')]/descendant::div[1]");
    this.deleteButton         = page.locator("//i[@class='oxd-icon bi-trash']");
    this.deleteConfirmButton  = page.locator("//button[text()=' Yes, Delete ']");
  }

  async goto(): Promise<void> {
    await this.page.goto('/web/index.php/admin/viewSystemUsers');
    await this.page.waitForLoadState('networkidle');
  }

  async clickAdd(): Promise<void> {
    await this.addButton.click();
    await this.page.waitForURL(/saveSystemUser/);
  }

  async searchByUsername(username: string): Promise<void> {
   // await this.openSearchForm.click();
    //await this.searchUsernameInput.clear();
    await this.searchUsernameInput.fill(username);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(500);
  }

  async getRowCount(): Promise<number> {
    await this.page.waitForTimeout(800);
    return await this.tableRows.count();
  }

  async getUsernameInRow(rowIndex: number = 0): Promise<string> {
    const cells = this.tableRows.nth(rowIndex).locator('.oxd-table-cell');
    return (await cells.nth(1).innerText()).trim();
  }

  async deleteUserAtRow(rowIndex: number = 0): Promise<void> {
    const row       = this.tableRows.nth(rowIndex);
    await this.deleteButton.click();
    await this.deleteConfirmButton.waitFor({ state: 'visible' });
    await this.deleteConfirmButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async assertOnAdminPage(): Promise<void> {
    await expect(this.page).toHaveURL(/viewSystemUsers/);
    await expect(this.addButton).toBeVisible();
  }

  async assertUserExistsInTable(username: string): Promise<void> {
    await this.searchByUsername(username);
    const count = await this.getRowCount();
    expect(count).toBeGreaterThanOrEqual(1);
    const actualUsername = await this.getUsernameInRow(0);
    expect(actualUsername).toBe(username);
  }

  async assertUserNotFound(): Promise<void> {
    const count = await this.getRowCount();
    expect(count).toBe(0);
  }
}
