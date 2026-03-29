import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage, DashboardPage, AdminPage, AddUserPage, AddEmployeePage, EmployeePage } from '../pages';
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
      let loginPage:      LoginPage;
      let dashboardPage:  DashboardPage;
      let employeePage:   EmployeePage;
      let addEmployeePage:AddEmployeePage;
      let adminPage:      AdminPage;
      let addUserPage:    AddUserPage;

      let username:     string;
      let employeeData: ReturnType<typeof buildEmployeeData>;
      let fullEmployeeName: string;

      test.beforeAll(async ({ browser }: { browser: Browser }) => {
        username         = `${baseData.usernameBase}_${generateRandomNumber()}`;
        employeeData     = buildEmployeeData();
        fullEmployeeName = `${employeeData.firstName} ${employeeData.middleName} ${employeeData.lastName}`;

        context         = await browser.newContext();
        page            = await context.newPage();
        loginPage       = new LoginPage(page);
        dashboardPage   = new DashboardPage(page);
        employeePage    = new EmployeePage(page);
        addEmployeePage = new AddEmployeePage(page);
        adminPage       = new AdminPage(page);
        addUserPage     = new AddUserPage(page);
      });

      test.afterAll(async () => {
        await context.close();
      });

      test('TC-001 | Login and validate the logged-in user', async () => {
        await loginPage.goto();
        await loginPage.assertPageLoaded();
        await loginPage.login(ADMIN_CREDENTIALS.username, ADMIN_CREDENTIALS.password);
        await dashboardPage.assertOnDashboard();
        const loggedUser = await dashboardPage.getLoggedInUsername();
        expect(loggedUser).not.toBeNull();
      });

      test('TC-002 | Navigate to Employee page', async () => {
        await dashboardPage.navigateToEmployee();
        await employeePage.assertOnEmployeePage();
      });

      test('TC-003 | Add a new employee', async () => {
        await employeePage.clickAdd();
        await addEmployeePage.assertOnAddEmployeePage();
        await addEmployeePage.fillAndSubmit({
          firstName:  employeeData.firstName,
          middleName: employeeData.middleName,
          lastName:   employeeData.lastName,
        });
        await addEmployeePage.assertEmployeeSavedSuccessfully();
      });

      test('TC-004 | Assert the new employee exists in the list', async () => {
        await employeePage.goto();
        await employeePage.assertEmployeeExists(
          employeeData.firstName,
          employeeData.middleName,
          employeeData.lastName,
        );
      });

      test('TC-005 | Navigate to Admin > User Management', async () => {
        await dashboardPage.navigateToAdmin();
        await adminPage.assertOnAdminPage();
      });

      test('TC-006 | Add a new system user linked to the new employee', async () => {
        await adminPage.goto();
        await adminPage.clickAdd();
        await addUserPage.assertOnAddUserPage();
        await addUserPage.fillAndSubmit({
          userRole:        baseData.userRole,
          employeeName:    fullEmployeeName,
          status:          baseData.status,
          username:        username,
          password:        baseData.password,
          confirmPassword: baseData.confirmPassword,
        });
        await addUserPage.assertUserSavedSuccessfully();
      });

      test('TC-007 | Assert the newly added user exists in the list', async () => {
        await adminPage.goto();
        await adminPage.searchByUsername(username);
        const rowCount = await adminPage.getRowCount();
        expect(rowCount).toEqual(1);
        const usernameInRow = await adminPage.getUsernameInRow(0);
        expect(usernameInRow).toBe(username);
      });

      test('TC-008 | Search for the added user by username', async () => {
        await adminPage.goto();
        await adminPage.searchByUsername(username);
        const rowCount = await adminPage.getRowCount();
        expect(rowCount).toEqual(1);
      });

      test('TC-009 | Assert the search result matches the added user', async () => {
        await adminPage.goto();
        await adminPage.searchByUsername(username);
        const usernameInRow = await adminPage.getUsernameInRow(0);
        expect(usernameInRow).toBe(username);
      });

      test('TC-010 | Delete the added user', async () => {
        await adminPage.goto();
        await adminPage.searchByUsername(username);
        const beforeCount = await adminPage.getRowCount();
        expect(beforeCount).toEqual(1);
        await adminPage.deleteUserAtRow(0);
      });

      test('TC-011 | Assert the user no longer exists after deletion', async () => {
        await adminPage.goto();
        await adminPage.searchByUsername(username);
        await adminPage.assertUserNotFound();
      });


  test('TC-012 | Delete the added employee', async () => {
        await employeePage.goto();
        await employeePage.assertEmployeeExists(
          employeeData.firstName,
          employeeData.middleName,
          employeeData.lastName,
        );
        await employeePage.deleteEmployeeAtRow(0);
      });

      test('TC-013 | Assert the employee no longer exists after deletion', async () => {
        await employeePage.goto();
        await employeePage.assertEmployeeNotFound(
          employeeData.firstName,
          employeeData.middleName,
          employeeData.lastName,
        );
      });

      test('TC-014 | Logout and assert redirect to login', async () => {
        await dashboardPage.logout();
        await dashboardPage.assertLoggedOut();
        await loginPage.assertPageLoaded();
      });
    },
  );
}
