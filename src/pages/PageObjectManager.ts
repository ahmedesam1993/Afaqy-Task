import {type Page } from "@playwright/test";
import { HomePage, LoginPage, RegistrationInfoPage } from '../pages';


export class PageObjectManager{
    private readonly page: Page;
    private readonly homePage: HomePage;
    private readonly registrationInfoPage: RegistrationInfoPage;
    private readonly loginpage: LoginPage;  

    constructor(page: Page){
        this.page = page;
        this.homePage = new HomePage(page);
        this.registrationInfoPage = new RegistrationInfoPage(page);
        this.loginpage = new LoginPage(page);
    }

    getHomePage(): HomePage {
        return this.homePage;
    }   

    getLoginPage(): LoginPage {
        return this.loginpage;
    }

    getRegistrationInfoPage(): RegistrationInfoPage {
        return this.registrationInfoPage;
    }

}