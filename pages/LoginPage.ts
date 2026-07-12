import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locators
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Sign In' });
    }

    // Go to login page
    async goto() {
        await this.page.goto('/login');
    }

  // Do the login
    async login(email: string, pass: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }

    // Check login page loaded correctly
    async assertLoginSuccess() {
        await expect(this.page).toHaveURL(/\/dashboard/);
    }

    // Assert the page is /login
    async assertLoaded() {
    await expect(this.page).toHaveURL(/\/login/);
  }
}