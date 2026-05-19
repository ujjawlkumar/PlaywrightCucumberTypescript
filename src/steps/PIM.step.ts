import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../utils/world";
import { PIMPage } from "../pages/PIMPage";

let pimPage: PIMPage;
let driverLicenseNumber: string = "D123"+Math.floor(Math.random() * 1000); // Generate a random driver license number for uniqueness
let employeeId: string = "12345"+Math.floor(Math.random() * 1000); // Generate a random employee ID for uniqueness
let updatedLicenseNumber: string = "D123"+Math.floor(Math.random() * 1000); // Generate a new random driver license number for update 


Given('user navigates to PIM tab', async function (this: CustomWorld) {
    pimPage = new PIMPage(this.page);
    await pimPage.navigateToPIM();
});

When('user adds a new employee', async function (this: CustomWorld) {
    await pimPage.addNewEmployee({
        firstName: "John"+String.fromCharCode(65 + Math.floor(Math.random() * 26)), // Generate a random first name
        lastName: "Doe",
        employeeId: employeeId
    });

});

When('user updates employee personal details', async function () {
    await pimPage.updateEmployeeDetails({
        driverLicenseNumber: updatedLicenseNumber,
        licenseExpiryDate: "2026-12-31",
        nationality: 'Indian',
        maritalStatus: 'Single',
        dateOfBirth: '1995-01-01',
        gender: 'Male'
    });
});

Then('employee details should be updated successfully', async function () {
    const isEmployeeAdded = await pimPage.isEmployeeUpdated(updatedLicenseNumber);
    expect(isEmployeeAdded).toBeTruthy();
});
