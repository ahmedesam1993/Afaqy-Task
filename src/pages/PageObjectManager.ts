import {type Page } from "@playwright/test";
import { HomePage, LoginPage, RegisterationInfoPage } from '../pages';


export class PageObjectManager{
    private readonly page: Page;
    private readonly homePage: HomePage;
    private readonly registerationInfoPage: RegisterationInfoPage;
    private readonly loginpage: LoginPage;  

    constructor(page: Page){
        this.page = page;
        this.homePage = new HomePage(page);
        this.registerationInfoPage = new RegisterationInfoPage(page);
        this.loginpage = new LoginPage(page);
    }

    getHomePage(): HomePage {
        return this.homePage;
    }   

    getLoginPage(): LoginPage {
        return this.loginpage;
    }

    getRegisterationInfoPage(): RegisterationInfoPage {
        return this.registerationInfoPage;
    }

}