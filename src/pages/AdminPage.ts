import {Page, Locator} from "@playwright/test";
export class AdminPage {
    private readonly adminTab: Locator;
    private readonly userManagementTab: Locator;
    private readonly usersTab: Locator;
    private readonly addButton: Locator;
    private readonly userRoleDropdown: Locator;
    private readonly employeeNameInput: Locator;
    private readonly usernameInput: Locator;
    private readonly statusDropdown: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly saveButton: Locator;  
    
    constructor(public page: Page) {

        this.page = page; 
        this.adminTab = page.locator("//a[contains(@href,'viewAdminModule')]");
        this.userManagementTab = page.locator("//span[text()='User Management ']");  
        this.usersTab = page.locator("//a[@role='menuitem' and text()='Users']"); 
        this.addButton = page.locator("//button[contains(@class,'button--secondary')]//i[contains(@class,'plus oxd-button')]");
        this.userRoleDropdown = page.locator("//label[text()='User Role']/../..//div[contains(@class,'oxd-select-text-input')]");
        this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]');
        this.usernameInput = page.locator("//label[text()='Username']/../following-sibling::div//input");
        this.statusDropdown = page.locator("//label[text()='Status']/../..//div[contains(@class,'oxd-select-text-input')]");
        this.passwordInput = page.locator("//label[text()='Password']/../following-sibling::div//input");
        this.confirmPasswordInput = page.locator("//label[text()='Confirm Password']/../following-sibling::div//input");
        this.saveButton = page.locator("//button[@type='submit']");
        
    }   

    async navigateToAdminTab(){
        await this.adminTab.click();
    }

    async navigateToUserManagement(){
        await this.userManagementTab.click();
    }

    async navigateToUserTab(){
        await this.usersTab.click();
    }

    async clickAddButton(){
        await this.addButton.click();
    }

    async selectUserRole(role: string){
        await this.userRoleDropdown.click();
        const roleOption = this.page.locator(`//div[contains(@class,'oxd-select-dropdown')]//span[text()='${role}']`);  // Admin or ESS
        await roleOption.click();
    }

    async enterEmployeeName(employeeName: string){
        await this.employeeNameInput.fill(employeeName);
        await this.page.waitForTimeout(2000); // Wait for auto-complete options to appear
        const autoCompleteOption = this.page.locator(`(//div[@role='option']//span[contains(text(),'${employeeName}')])[1]`);
        await autoCompleteOption.click();
    } 
    
    async selectStatus(status: string){
        await this.statusDropdown.click();
        const statusOption = this.page.locator(`//div[contains(@class,'oxd-select-dropdown')]//span[text()='${status}']`);  
        await statusOption.click();
    }

    async enterUsername(username: string){
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string){
        await this.passwordInput.fill(password);
    }

    async enterConfirmPassword(password: string){
        await this.confirmPasswordInput.fill(password);
    }
    async clickSaveButton(){
        await this.saveButton.click();
    }
    
    async isUserAdded(username: string): Promise<boolean> {
        await this.page.waitForTimeout(2000);
        const userNameXpath = "//div[@class='oxd-table-body']//div[@class='oxd-table-cell oxd-padding-cell'][2]//div";
        await this.page.waitForSelector(userNameXpath);
        const userNameList = this.page.locator(userNameXpath);
        const userNames = await userNameList.allTextContents();  
        // count the number of usernames present in the list
        console.log(`Total users in the list: ${userNames.length}`);
        // check if the username we just created is present in the list of usernames
        let userFound = false;
        for (const name of userNames) {
            if (name.trim() === username) {
                userFound = true;
                break;
            } 
        }
        return userFound;
    }




}