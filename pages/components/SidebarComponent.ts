import { Page, Locator } from '@playwright/test';

export class SidebarComponent {
  readonly page: Page;
  readonly newAppointmentLink: Locator;
  readonly appointmentsLink: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.newAppointmentLink = page.getByRole('link', { name: 'New Appointment' });
    this.appointmentsLink = page.getByRole('link', { name: 'Appointments', exact: true });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  // click on new appointment button
  async clickNewAppointment() {
    await this.newAppointmentLink.click();
  }

  // Click on appointments
  async clickAppointments() {
    await this.appointmentsLink.click();
  }

  // Click on logout 
  async clickLogout() {
    await this.logoutButton.click();
  }
}