import {Given, When, Then} from "@cucumber/cucumber";
import {expect} from "@playwright/test";
import {CustomWorld} from "../utils/world";
import {LoginPage} from "../pages/LoginPage"; 

let loginPage: LoginPage;

    Given('user launches OrangeHRM application', async function (this: CustomWorld) {
        loginPage = new LoginPage(this.page);
        await loginPage.navigateToApplication();
    });

    When('user retrieves the displayed credentials', async function () {
        await loginPage.retrieveCredentials();
    });
    When('user enters retrieved credentials', async function () {
        await loginPage.enterCredentials();
    });
    When('user clicks on login button', async function () {
        await loginPage.clickLoginButton();
    });

    Then('user should be logged in to the application', async function () {
        const isDashboardVisible = await loginPage.isDashboardVisible();
        expect(isDashboardVisible).toBeTruthy();
     });

     Given('user is logged into OrangeHRM application', async function (this: CustomWorld) {
        loginPage = new LoginPage(this.page);
        await loginPage.navigateToApplication();
        await loginPage.loginToApplication('Admin', 'admin123');
    });