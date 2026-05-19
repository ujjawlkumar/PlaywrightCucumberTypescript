import {Given, When, Then} from "@cucumber/cucumber";
import {expect} from "@playwright/test";
import {CustomWorld} from "../utils/world";
import {AdminPage} from "../pages/AdminPage";

let adminPage: AdminPage;
let usernameValue: string;

    Given('user navigates to Admin tab', async function (this: CustomWorld) {
        adminPage = new AdminPage(this.page);
        await adminPage.navigateToAdminTab();
    });

    When('user clicks on Add button', async function (this: CustomWorld) {
        await adminPage.clickAddButton();
    });

    When('user fills in the user details with role {string}, employee name {string}, status {string}, username {string}, password {string} and confirm password {string}', 
        async function (
    this: CustomWorld,
    role: string,
    employeeName: string,
    status: string,
    username: string,
    password: string,
    confirmPassword: string
  ) {
        await adminPage.selectUserRole(role);
        await adminPage.enterEmployeeName(employeeName);
        await adminPage.selectStatus(status);
        usernameValue = `testuser${Date.now()}`;
        await adminPage.enterUsername(usernameValue);
        await adminPage.enterPassword(password);
        await adminPage.enterConfirmPassword(confirmPassword);
    });

    When('user clicks on Save button', async function (this: CustomWorld) {
        await adminPage.clickSaveButton();  
    });

    Then("user should be added successfully in the list", async function (this: CustomWorld) {
        // want to wait for the success message to appear after saving the user
        const successToast = this.page.locator('.oxd-toast');
        await expect(successToast).toContainText('Success', {
            timeout: 10000
        });
        // After saving, we should be back on the user list page. We can search for the username we just created.
        await this.page.waitForTimeout(5000); // Wait for the user list to refresh
        const isUserAdded = await adminPage.isUserAdded(usernameValue);
        expect(isUserAdded).toBe(true);
    });

