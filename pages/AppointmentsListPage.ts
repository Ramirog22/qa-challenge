import { Page, Locator, expect } from '@playwright/test';

export class AppointmentsListPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly appointmentCards: Locator;
  readonly activeAppointmentCards: Locator;
  readonly newDateInput: Locator;
  readonly newTimeSelect: Locator;
  readonly confirmBtn: Locator;
  readonly successBanner: Locator;
  readonly cancelSuccessBanner: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.pageHeader = page.getByRole('heading', { name: 'Appointments' });
    this.appointmentCards = page.locator('div.shadow-custom');
    this.activeAppointmentCards = this.appointmentCards.filter({
      has: page.getByText('Active', { exact: true }),
    });
    this.newDateInput = page.locator('input[type="date"]');
    this.newTimeSelect = page.locator('select');
    this.confirmBtn = page.getByRole('button', { name: 'Confirm' });
    this.successBanner = page.getByText('Appointment rescheduled successfully');
    this.cancelSuccessBanner = page.getByText('Appointment successfully cancelled');
  }

  // Check the appointemnt list page loaded correctly
  async assertLoaded() {
    await expect(this.page).toHaveURL(/\/appointments$/);
    await expect(this.pageHeader).toBeVisible();
  }

  // Reschedule an appointment which is in active state
  async rescheduleFirstActiveAppointment(newDate: string, newTime: string) {
    const targetCard = this.activeAppointmentCards.first();

    await expect(targetCard).toBeVisible();

    await targetCard.getByRole('button', { name: 'Reschedule' }).click();

    await this.newDateInput.fill(newDate);
    await this.newTimeSelect.selectOption(newTime);
    await this.confirmBtn.click();
  }

  // Check the banner of success is shown
  async assertRescheduleSuccess() {
    await expect(this.successBanner).toBeVisible();
  }

  // Check the banner of success cancellation is shown
  async assertCancelSuccess() {
    await expect(this.cancelSuccessBanner).toBeVisible();
  }

  // Canncels the first active appointment
  async cancelFirstActiveAppointment() {
    const targetCard = this.activeAppointmentCards.first();

    await expect(targetCard).toBeVisible();

    await targetCard.getByRole('button', { name: 'Cancel' }).click();
  }
}