import { Page, Locator, expect } from '@playwright/test';
import { buildNewUserData, completeUserData } from '../data/testData';

  const newUser = buildNewUserData();


export class RegistrationInfoPage {
  //============Locators============
  readonly page:          Page;
  readonly titleRadioButtons: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator; 
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator; 
  readonly createAccountButton:   Locator;
  readonly accountCreatedMessage: Locator;
  readonly continueButton: Locator;

  //============Constructor============
  constructor(page: Page) {
    this.page          = page;
    this.titleRadioButtons = page.locator('//input[@value="Mr"]');
    this.nameInput = page.locator('//input[@data-qa="name"]');
    this.emailInput = page.locator('//input[@data-qa="email"]');
    this.passwordInput = page.locator('//input[@data-qa="password"]');
    this.daySelect = page.locator('//select[@data-qa="days"]');
    this.monthSelect = page.locator('//select[@data-qa="months"]');
    this.yearSelect = page.locator('//select[@data-qa="years"]');
    this.firstNameInput = page.locator('//input[@data-qa="first_name"]');
    this.lastNameInput = page.locator('//input[@data-qa="last_name"]');
    this.companyInput = page.locator('//input[@data-qa="company"]');
    this.addressInput = page.locator('//input[@data-qa="address"]');
    this.countrySelect = page.locator('//select[@data-qa="country"]');
    this.stateInput = page.locator('//input[@data-qa="state"]');
    this.cityInput = page.locator('//input[@data-qa="city"]');
    this.zipcodeInput = page.locator('//input[@data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('//input[@data-qa="mobile_number"]');
    this.createAccountButton = page.locator('//button[@data-qa="create-account"]');
    this.accountCreatedMessage = page.locator('//*[@data-qa="account-created"]');

    this.continueButton = page.locator('//a[@data-qa="continue-button"]');
  }
  //============Methods============
  //============Actions============
async completeSignUp(userData: completeUserData): Promise<void> {
  await this.titleRadioButtons.check();
  await this.nameInput.inputValue(); 
  await this.passwordInput.fill(userData.password);
  await this.daySelect.selectOption(userData.day.toString());
  await this.monthSelect.selectOption(userData.month.toString());
  await this.yearSelect.selectOption(userData.year.toString());
  await this.firstNameInput.fill(userData.firstName);
  await this.lastNameInput.fill(userData.lastName); 
  await this.companyInput.fill(userData.company);
  await this.addressInput.fill(userData.address);
  await this.countrySelect.selectOption(userData.country);
  await this.stateInput.fill(userData.state);
  await this.cityInput.fill(userData.city);
  await this.zipcodeInput.fill(userData.zipcode.toString());
  await this.mobileNumberInput.fill(userData.mobileNumber);
  await this.createAccountButton.click();
}

async clickContinueButton(): Promise<void> {
  await this.continueButton.click();
} 


  //============Assertions============
  async assertPageLoaded(): Promise<void> {
    await expect(this.page.url()).toContain('/signup'); 
    await expect(this.titleRadioButtons).toBeVisible();
    await expect(this.nameInput).toHaveValue(newUser.name);
    await expect(this.emailInput).toHaveValue(newUser.email);
    await expect(this.emailInput).toBeDisabled();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.daySelect).toBeVisible();
    await expect(this.monthSelect).toBeVisible();
    await expect(this.yearSelect).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.companyInput).toBeVisible();
    await expect(this.addressInput).toBeVisible();
    await expect(this.countrySelect).toBeVisible();
    await expect(this.stateInput).toBeVisible();
    await expect(this.cityInput).toBeVisible();
    await expect(this.zipcodeInput).toBeVisible();
    await expect(this.mobileNumberInput).toBeVisible();
    await expect(this.createAccountButton).toBeVisible();
  }

  async assertAccountCreated(): Promise<void> {
    await expect(this.page.url()).toContain('/account_created');
    await expect(this.accountCreatedMessage).toBeVisible();
    await expect(this.accountCreatedMessage).toHaveText('Account Created!');
    await expect(this.continueButton).toBeVisible();
  
  }
}
