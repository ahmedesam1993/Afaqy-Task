import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import { PageObjectManager } from '../pages/PageObjectManager';
import {
  ADMIN_CREDENTIALS,
  EXPECTED_LOGGED_USER,
  NEW_USERS,
  generateRandomNumber,
  buildEmployeeData,
} from '../data/testData';

for (const baseData of NEW_USERS) {

  test.describe.serial(
    `User Management — role: ${baseData.userRole} | base: ${baseData.usernameBase}`,
    () => {
      let context:        BrowserContext;
      let page:           Page;
      let pageObjectManager: PageObjectManager;

      let username:     string;
      let employeeData: ReturnType<typeof buildEmployeeData>;
      let fullEmployeeName: string;

      test.beforeAll(async ({ browser }: { browser: Browser }) => {
        username         = `${baseData.usernameBase}_${generateRandomNumber()}`;
        employeeData     = buildEmployeeData();
        fullEmployeeName = `${employeeData.firstName} ${employeeData.middleName} ${employeeData.lastName}`;

        context         = await browser.newContext();
        page            = await context.newPage();
        pageObjectManager       = new PageObjectManager(page);
      });

      test.afterAll(async () => {
        await context.close();
      });

      test('TC-001 | Login and validate the logged-in user', async () => {
        await pageObjectManager.getLoginPage().goto();
        await pageObjectManager.getLoginPage().assertPageLoaded();
        await pageObjectManager.getLoginPage().login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
        await pageObjectManager.getDashboardPage().assertOnDashboard();
        const loggedUser = await pageObjectManager.getDashboardPage().getLoggedInUsername();
        expect(loggedUser).not.toBeNull();
      });

      test('TC-002 | Navigate to Employee page', async () => {
        await pageObjectManager.getDashboardPage().navigateToEmployee();
        await pageObjectManager.getEmployeePage().assertOnEmployeePage();
      });

      test('TC-003 | Add a new employee', async () => {
        await pageObjectManager.getEmployeePage().clickAdd();
        await pageObjectManager.getAddEmployeePage().assertOnAddEmployeePage();
        await pageObjectManager.getAddEmployeePage().fillAndSubmit({
          firstName:  employeeData.firstName,
          middleName: employeeData.middleName,
          lastName:   employeeData.lastName,
        });
        await pageObjectManager.getAddEmployeePage().assertEmployeeSavedSuccessfully();
      });

      test('TC-004 | Assert the new employee exists in the list', async () => {
        await pageObjectManager.getEmployeePage().goto();
        await pageObjectManager.getEmployeePage().assertEmployeeExists(
          employeeData.firstName,
          employeeData.middleName,
          employeeData.lastName,
        );
      });

      test('TC-005 | Navigate to Admin > User Management', async () => {
        await pageObjectManager.getDashboardPage().navigateToAdmin();
        await pageObjectManager.getAdminPage().assertOnAdminPage();
      });

      test('TC-006 | Add a new system user linked to the new employee', async () => {
        await pageObjectManager.getAdminPage().goto();
        await pageObjectManager.getAdminPage().clickAdd();
        await pageObjectManager.getAddUserPage().assertOnAddUserPage();
        await pageObjectManager.getAddUserPage().fillAndSubmit({
          userRole:        baseData.userRole,
          employeeName:    fullEmployeeName,
          status:          baseData.status,
          username:        username,
          password:        baseData.password,
          confirmPassword: baseData.confirmPassword,
        });
        await pageObjectManager.getAddUserPage().assertUserSavedSuccessfully();
      });

      test('TC-007 | Assert the newly added user exists in the list', async () => {
        await pageObjectManager.getAdminPage().goto();
        await pageObjectManager.getAdminPage().searchByUsername(username);
        const rowCount = await pageObjectManager.getAdminPage().getRowCount();
        expect(rowCount).toEqual(1);
        const usernameInRow = await pageObjectManager.getAdminPage().getUsernameInRow(0);
        expect(usernameInRow).toBe(username);
      });

      test('TC-008 | Search for the added user by username', async () => {
        await pageObjectManager.getAdminPage().goto();
        await pageObjectManager.getAdminPage().searchByUsername(username);
        const rowCount = await pageObjectManager.getAdminPage().getRowCount();
        expect(rowCount).toEqual(1);
      });

      test('TC-009 | Assert the search result matches the added user', async () => {
        await pageObjectManager.getAdminPage().goto();
        await pageObjectManager.getAdminPage().searchByUsername(username);
        const usernameInRow = await pageObjectManager.getAdminPage().getUsernameInRow(0);
        expect(usernameInRow).toBe(username);
      });

      test('TC-010 | Delete the added user', async () => {
        await pageObjectManager.getAdminPage().goto();
        await pageObjectManager.getAdminPage().searchByUsername(username);
        const beforeCount = await pageObjectManager.getAdminPage().getRowCount();
        expect(beforeCount).toEqual(1);
        await pageObjectManager.getAdminPage().deleteUserAtRow(0);
      });

      test('TC-011 | Assert the user no longer exists after deletion', async () => {
        await pageObjectManager.getAdminPage().goto();
        await pageObjectManager.getAdminPage().searchByUsername(username);
        await pageObjectManager.getAdminPage().assertUserNotFound();
      });


  test('TC-012 | Delete the added employee', async () => {
        await pageObjectManager.getEmployeePage().goto();
        await pageObjectManager.getEmployeePage().assertEmployeeExists(
          employeeData.firstName,
          employeeData.middleName,
          employeeData.lastName,
        );
        await pageObjectManager.getEmployeePage().deleteEmployeeAtRow(0);
      });

      test('TC-013 | Assert the employee no longer exists after deletion', async () => {
        await pageObjectManager.getEmployeePage().goto();
        await pageObjectManager.getEmployeePage().assertEmployeeNotFound(
          employeeData.firstName,
          employeeData.middleName,
          employeeData.lastName,
        );
      });

      test('TC-014 | Logout and assert redirect to login', async () => {
        await pageObjectManager.getDashboardPage().logout();
        await pageObjectManager.getDashboardPage().assertLoggedOut();
        await pageObjectManager.getLoginPage().assertPageLoaded();
      });
    },
  );
}
