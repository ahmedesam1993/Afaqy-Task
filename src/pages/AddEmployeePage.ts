import { Page, Locator, expect } from '@playwright/test';

export class AddEmployeePage {
  readonly page:         Page;
  readonly firstName:    Locator;
  readonly middleName:   Locator;
  readonly lastName:     Locator;
  readonly saveEmployee: Locator;

  constructor(page: Page) {
    this.page         = page;
    this.firstName    = page.locator("//input[@placeholder='First Name']");
    this.middleName   = page.locator("//input[@placeholder='Middle Name']");
    this.lastName     = page.locator("//input[@placeholder='Last Name']");
    this.saveEmployee = page.locator("//button[normalize-space()='Save']");
  }

  async fillAndSubmit(employeeData: {
    firstName:  string;
    middleName: string;
    lastName:   string;
  }): Promise<void> {
    await this.firstName.fill(employeeData.firstName);
    await this.middleName.fill(employeeData.middleName);
    await this.lastName.fill(employeeData.lastName);
    await this.saveEmployee.click();
  }

  async assertOnAddEmployeePage(): Promise<void> {
    await expect(this.page).toHaveURL(/addEmployee/);
    await expect(this.firstName).toBeVisible();
  }

  async assertEmployeeSavedSuccessfully(): Promise<void> {
    await expect(this.page).toHaveURL(/viewPersonalDetails/, { timeout: 30000 });
  }
}
