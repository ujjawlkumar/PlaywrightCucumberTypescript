import { Page, Locator } from "playwright/test";
export class PIMPage {
    private page: Page;
    private pimMenu : Locator; 
    private addEmployeeButton : Locator;
    private employeeImageUploadButton : Locator;
    private employeeFirstNameInput : Locator;
    private employeeLastNameInput : Locator;
    private employeeIdInput : Locator 
    private saveEmployeeButton : Locator;

    // locators for employee details page can be added here

    private driverLicenseNumberInput : Locator;
    private licenseExpiryDateInput : Locator;
    private nationalityDropdown : Locator
    private maritalStatusDropdown : Locator;
    private dateOfBirthInput : Locator;




    constructor(page: Page) {
        this.page = page;
        this.pimMenu = this.page.locator("//a[contains(@href,'viewPimModule')]");
        this.addEmployeeButton = this.page.locator("//button[contains(@class,'button--secondary')]//*[contains(@class,'oxd-button-icon')]");
        this.employeeImageUploadButton = this.page.locator("//button[contains(@class,'employee-image')])");
        this.employeeFirstNameInput = this.page.locator("//input[@name='firstName']");
        this.employeeLastNameInput = this.page.locator("//input[@name='lastName']");
        this.employeeIdInput = this.page.locator("//label[text()='Employee Id']/..//following-sibling::div//input");
        this.saveEmployeeButton = this.page.locator("//button[contains(@class,'button--secondary') and @type='submit']");
        this.driverLicenseNumberInput = this.page.locator("//label[contains(text(),'License Number')]/..//following-sibling::div//input");
        this.licenseExpiryDateInput = this.page.locator("//label[contains(text(),'License Expiry Date')]/..//following-sibling::div//input");
        this.nationalityDropdown = this.page.locator("//label[text()='Nationality']/../..//div[@class='oxd-select-text-input']");
        this.maritalStatusDropdown = this.page.locator("//label[text()='Marital Status']/../..//div[@class='oxd-select-text-input']");
        this.dateOfBirthInput = this.page.locator("//label[text()='Date of Birth']/..//following-sibling::div//input");
    }

    async navigateToPIM() {
        await this.pimMenu.click();
    }
    async clickAddEmployee() {
        await this.addEmployeeButton.click();
    }

    async uploadEmployeeImage(imagePath: string) {
        await this.employeeImageUploadButton.setInputFiles(imagePath);
    }

    async enterEmployeeFirstName(firstName: string) {
        await this.employeeFirstNameInput.fill(firstName);
    }

    async enterEmployeeLastName(lastName: string) {
        await this.employeeLastNameInput.fill(lastName);
    }

    async enterEmployeeId(employeeId: string) {
        await this.employeeIdInput.clear();
        await this.employeeIdInput.fill(employeeId);
    }

    async clickSaveEmployee() {
        await this.saveEmployeeButton.click();
    }

    async enterDriverLicenseNumber(licenseNumber: string) {
        await this.driverLicenseNumberInput.fill(licenseNumber);
    }

    async enterLicenseExpiryDate(expiryDate: string) {
        await this.licenseExpiryDateInput.fill(expiryDate);
    }

    async selectNationality(nationality: string) {
        await this.nationalityDropdown.click();
        await this.page.locator(`//div[@class='oxd-select-option' and @role='option']//span[text()='${nationality}']`).click();
    }

    async selectMaritalStatus(status: string) {
        await this.maritalStatusDropdown.click();
        await this.page.locator(`//div[@class='oxd-select-option' and @role='option']//span[text()='${status}']`).click();
    }

    async enterDateOfBirth(dob: string) {
        await this.dateOfBirthInput.fill(dob);
    }

    async selectGender(gender: string) {
        //this.genderRadioButtons = this.page.locator("//label[text()='Gender']/../following-sibling::div//input[@value='1']");

        const genderValue = gender.toLowerCase() === 'male' ? '1' : '2';

        console.log("Gender value",genderValue);

        await this.page.locator(`//label[text()='Gender']/../following-sibling::div//input[@value='${genderValue}']/..`).click();
        //await this.genderRadioButtons.filter({ has: this.page.locator(`//label[text()='Gender']/../following-sibling::div//input[@value='${gender}']`) }).check();
    } 
    
    
    public async addNewEmployee(employeeData: {
        firstName: string;
        lastName: string;
        employeeId: string;
    }) {
        await this.clickAddEmployee();
        await this.enterEmployeeFirstName(employeeData.firstName);
        await this.enterEmployeeLastName(employeeData.lastName);
        await this.enterEmployeeId(employeeData.employeeId);
        await this.clickSaveEmployee();
    }

    public async updateEmployeeDetails(employeeData: {
        driverLicenseNumber: string;
        licenseExpiryDate: string;
        nationality: string;
        maritalStatus: string;
        dateOfBirth: string;
        gender: string;
    }) {       
        await this.enterDriverLicenseNumber(employeeData.driverLicenseNumber);
        await this.enterLicenseExpiryDate(employeeData.licenseExpiryDate);
        await this.selectNationality(employeeData.nationality);
        await this.selectMaritalStatus(employeeData.maritalStatus);
        await this.enterDateOfBirth(employeeData.dateOfBirth);
        await this.selectGender(employeeData.gender);
        await this.clickSaveEmployee();

    }

    async isEmployeeUpdated(licenseNumber: string): Promise<boolean> {
        // Implementation for checking if employee details are updated
        const updatedLicenseNumber = (await this.driverLicenseNumberInput.innerText()).trim();
        await this.page.waitForTimeout(5000);
        return updatedLicenseNumber === licenseNumber;
    }

}
