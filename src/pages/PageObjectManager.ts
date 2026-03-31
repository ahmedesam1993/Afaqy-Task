import {type Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { EmployeePage } from "./EmployeePage";
import { AddEmployeePage } from "./AddEmployeePage";
import { AdminPage } from "./AdminPage";
import { AddUserPage } from "./AddUserPage";

export class PageObjectManager{
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly dashboardPage: DashboardPage;
    private readonly employeePage: EmployeePage;
    private readonly addEmployeePage: AddEmployeePage;
    private readonly adminPage: AdminPage;
    private readonly addUserPage: AddUserPage;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.employeePage = new EmployeePage(this.page);
        this.addEmployeePage = new AddEmployeePage(this.page);
        this.adminPage = new AdminPage(this.page);
        this.addUserPage = new AddUserPage(this.page);
    }
getLoginPage(){
    return this.loginPage;
}
getDashboardPage(){
    return this.dashboardPage;
}
getAddEmployeePage(){
    return this.addEmployeePage;
}
getAddUserPage(){
    return this.addUserPage;
}
getAdminPage(){
    return this.adminPage;
}
getEmployeePage(){
    return this.employeePage;
}
}