import { Page, Locator, expect } from '@playwright/test';

export class AppointmentPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly doctorSelect: Locator;
  readonly dateInput: Locator;
  readonly timeSlotSelect: Locator;
  readonly notesInput: Locator;
  readonly bookAppointmentBtn: Locator;
  readonly successHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators 
    this.pageHeader = page.getByRole('heading', { name: 'Book Appointment' });
    this.doctorSelect = page.locator('#doctor_id');
    this.dateInput = page.locator('#appointment_date');
    this.timeSlotSelect = page.locator('#time_slot');
    this.notesInput = page.locator('#notes');
    this.bookAppointmentBtn = page.getByTestId('submit-appointment');
    this.successHeading = page.getByRole('heading', { name: 'Appointment Booked!' });
  }

  // Create appointment
  async createAppointment(doctorIdOrLabel: string, date: string, timeSlotValueOrLabel: string, notes?: string) {
    // Doctor
    await this.doctorSelect.selectOption(doctorIdOrLabel);

    // Date
    await this.dateInput.fill(date);

    // Time slot
    await this.timeSlotSelect.selectOption(timeSlotValueOrLabel);

    // Note
    if (notes) {
      await this.notesInput.fill(notes);
    }

    // Book appointment
    await this.bookAppointmentBtn.click();
  }

  // Check the page has lodad
  async assertLoaded() {
    await expect(this.page).toHaveURL(/\/appointments\/new/);
    await expect(this.pageHeader).toBeVisible();
  }
  
  // check the appointment were created
  async assertAppointmentCreatedSuccess() {
    await expect(this.successHeading).toBeVisible();
  }
}