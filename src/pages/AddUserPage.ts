import { Page, Locator, expect } from '@playwright/test';

export class AddUserPage {
  readonly page:                 Page;
  readonly userRoleDropdown:     Locator;
  readonly statusDropdown:       Locator;
  readonly employeeNameInput:    Locator;
  readonly employeeChoose:        Locator;
  readonly usernameInput:        Locator;
  readonly passwordInput:        Locator;
  readonly confirmPasswordInput: Locator;
  readonly saveButton:           Locator;

  constructor(page: Page) {
    this.page                 = page;
    this.userRoleDropdown     = page.locator("//label[text()='User Role']/following::div[1]");
    this.statusDropdown       = page.locator("//label[text()='Status']/following::div[1]");
    this.employeeNameInput    = page.locator("//label[text()='Employee Name']/following::input[1]");
    this.employeeChoose       = page.locator("//div[@role='listbox']");
    this.usernameInput        = page.locator("//label[text()='Username']/following::input[1]");
    this.passwordInput        = page.locator("//label[text()='Password']/following::input[1]");
    this.confirmPasswordInput = page.locator("//label[text()='Confirm Password']/following::input[1]");
    this.saveButton           = page.locator('button[type="submit"]');
  }

  private async selectDropdownOption(trigger: Locator, optText: string): Promise<void> {
    await trigger.click();
    const option = this.page
      .locator('.oxd-select-dropdown .oxd-select-option span')
      .filter({ hasText: optText });
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  async selectUserRole(role: string): Promise<void> {
    await this.selectDropdownOption(this.userRoleDropdown, role);
  }

  async selectStatus(status: string): Promise<void> {
    await this.selectDropdownOption(this.statusDropdown, status);
  }

  async setEmployeeName(searchText: string): Promise<void> {
    await this.employeeNameInput.click();
    await this.employeeNameInput.pressSequentially(searchText, { delay: 150 });
     const responsePromise = this.page.waitForResponse(
      res => res.url().includes('employees') && res.status() === 200,
      { timeout: 15000 }
    );
    await responsePromise;
    this.employeeNameInput.waitFor({ state: 'visible', timeout: 20000 });
    await this.employeeChoose.click();

  }

  async fillAndSubmit(userData: {
    userRole:        string;
    employeeName:    string;
    status:          string;
    username:        string;
    password:        string;
    confirmPassword: string;
  }): Promise<void> {
    await this.selectUserRole(userData.userRole);
    await this.setEmployeeName(userData.employeeName);
    await this.selectStatus(userData.status);
    await this.usernameInput.fill(userData.username);
    await this.passwordInput.fill(userData.password);
    await this.confirmPasswordInput.fill(userData.confirmPassword);
    await this.saveButton.click();
  }

  async assertOnAddUserPage(): Promise<void> {
    await expect(this.page).toHaveURL(/saveSystemUser/);
    await expect(this.saveButton).toBeVisible();
  }

  async assertUserSavedSuccessfully(): Promise<void> {
    await expect(this.page).toHaveURL(/viewSystemUsers/, { timeout: 20000 });
  }
}
