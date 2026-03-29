import { Page, Locator, expect } from '@playwright/test';

export class EmployeePage {
  readonly page:                  Page;
  readonly addButton:             Locator;
  readonly searhEmployeeNameInput:  Locator;
  readonly searchButton:          Locator;
  readonly tableRows:             Locator;
  readonly deleteConfirmButton:   Locator;
  readonly deleteButton:          Locator;

  constructor(page: Page) {
    this.page                 = page;
    this.addButton            = page.locator("//*[text()=' Add ']");
    this.searhEmployeeNameInput = page.locator("//label[text()='Employee Name']/following::input[@placeholder='Type for hints...'][1]");
    this.searchButton         = page.locator("//button[@type='submit']");
    this.tableRows            = page.locator("//div[contains(@class,'oxd-table-body')]/descendant::div[1]");
    this.deleteButton         = page.locator("//i[@class='oxd-icon bi-trash']");
    this.deleteConfirmButton  = page.locator("//button[text()=' Yes, Delete ']");
  }

async goto(): Promise<void> {
    await this.page.goto('/web/index.php/pim/viewEmployeeList');
    await this.page.waitForLoadState('networkidle');
  }

  async clickAdd(): Promise<void> {
    await this.addButton.click();
    await this.page.waitForURL('**/addEmployee', { timeout: 30000 });
  }

  async searchByEmployeeName(firstName: string, middleName: string, lastName: string): Promise<void> {
    const fullName = `${firstName} ${middleName} ${lastName}`.trim();
    await this.searhEmployeeNameInput.fill(fullName);
    await this.searchButton.click();
    await this.page.waitForTimeout(1000);
  }

  async getRowCount(): Promise<number> {
    await this.page.waitForTimeout(800);
    return await this.tableRows.count();
  }

   async deleteEmployeeAtRow(rowIndex: number = 0): Promise<void> {
    const row       = this.tableRows.nth(rowIndex);
    await this.deleteButton.click();
    await this.deleteConfirmButton.waitFor({ state: 'visible' });
    await this.deleteConfirmButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async assertOnEmployeePage(): Promise<void> {
    await expect(this.page).toHaveURL(/viewEmployeeList/);
    await expect(this.addButton).toBeVisible();
  }

  async assertEmployeeExists(firstName: string, middleName: string, lastName: string): Promise<void> {
    await this.searchByEmployeeName(firstName, middleName, lastName);
    const count = await this.getRowCount();
    expect(count).toBeGreaterThanOrEqual(1);
  }

  
  async assertEmployeeNotFound(firstName: string, middleName: string, lastName: string): Promise<void> {
    await this.searchByEmployeeName(firstName, middleName, lastName);
    const count = await this.getRowCount();
    expect(count).toBe(0);
  }
}