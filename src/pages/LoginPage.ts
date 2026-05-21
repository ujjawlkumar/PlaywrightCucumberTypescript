import {Page, Locator} from "@playwright/test";
import { config } from "../config/config";

export class LoginPage {

    private readonly usernameText: Locator;
    private readonly passwordText: Locator;

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;

    private readonly loginButton: Locator;
    private readonly dashboardHeader: Locator;

    // Variables to store extracted credentials
    public extractedUsername!: string;
    public extractedPassword!: string;

    constructor(public page: Page) {

        this.dashboardHeader = page.locator('h6');
        this.page = page;

        // Displayed credential texts
        this.usernameText = page.locator('div.orangehrm-demo-credentials p').nth(0);
        this.passwordText = page.locator('div.orangehrm-demo-credentials p').nth(1);

        // Input fields
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');

        // Login button
        this.loginButton = page.locator('button[type="submit"]');

        // Dashboard validation
        this.dashboardHeader = page.locator('h6');
    }

    async retrieveCredentials(): Promise<void> {
        const userNameFullText = await this.usernameText.textContent();
        const passwordFullText = await this.passwordText.textContent();

        // Extract just the username and password values
        this.extractedUsername = userNameFullText?.split(':')[1]?.trim() || '';
        this.extractedPassword = passwordFullText?.split(':')[1]?.trim() || '';

        console.log(`Extracted Username: ${this.extractedUsername}`);
        console.log(`Extracted Password: ${this.extractedPassword}`);
    }

    async navigateToApplication(){
        await this.page.goto(config.baseUrl);
    }

    async enterCredentials(){
        await this.usernameInput.fill(this.extractedUsername);
        await this.passwordInput.fill(this.extractedPassword);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }

    async isDashboardVisible(): Promise<boolean> {
        await this.dashboardHeader.waitFor({ state: 'visible', timeout: config.timeout });
        const headerText = await this.dashboardHeader.textContent();
        return headerText?.includes('Dashboard') ?? false;
    }

    async loginToApplication(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }



}
