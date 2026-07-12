import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SidebarComponent } from '../pages/components/SidebarComponent';
import { AppointmentPage } from '../pages/AppointmentPage';
import { getFutureDate } from '../utils/dateUtils';
import { AppointmentsListPage } from '../pages/AppointmentsListPage';

test.describe('Appointment Management', () => {

  test.beforeEach(async ({ page }) => {
    // login
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const user = process.env.TEST_USER || '';
    const password = process.env.TEST_PASSWORD || '';

    await loginPage.login(user, password);

    // Check that the login worked
    await loginPage.assertLoginSuccess();
  });

  test.afterEach(async ({ page }) => {
    const sidebar = new SidebarComponent(page);
    const loginPage = new LoginPage(page);

    // 1. Clic en Logout al finalizar cada test
    await sidebar.clickLogout();

    // 2. Asercion: Validar que el usuario fue redirigido a /login
    await loginPage.assertLoaded();
  });

  test('User should successfully book a new appointment', async ({ page }) => {
    const sidebar = new SidebarComponent(page);
    const appointmentPage = new AppointmentPage(page);

    // New Appointment
    await sidebar.clickNewAppointment();
    await appointmentPage.assertLoaded();

    // Generate a future date
    const dynamicDate = getFutureDate(7);

    // Create appointment
    await appointmentPage.createAppointment('1', dynamicDate, '09:00', 'Automated test');

    // Check that the appointment created successfully
    await appointmentPage.assertAppointmentCreatedSuccess();
  });

  test('User should successfully reschedule an active appointment', async ({ page }) => {
    const sidebar = new SidebarComponent(page);
    const appointmentsListPage = new AppointmentsListPage(page);

    // Go to appointment list page
    await sidebar.clickAppointments();
    await appointmentsListPage.assertLoaded();

    // Get new date
    const newDate = getFutureDate(10);

    // Reschedule
    await appointmentsListPage.rescheduleFirstActiveAppointment(newDate, '10:00');

    // Validate success
    await appointmentsListPage.assertRescheduleSuccess();
  });

  test('User should successfully cancel an active appointment', async ({ page }) => {
    const sidebar = new SidebarComponent(page);
    const appointmentsListPage = new AppointmentsListPage(page);

    // 1. Ir a la lista de turnos
    await sidebar.clickAppointments();
    await appointmentsListPage.assertLoaded();

    // 2. Cancelar el primer turno activo
    await appointmentsListPage.cancelFirstActiveAppointment();

    // 3. Validar banner de confirmacion
    await appointmentsListPage.assertCancelSuccess();
  });
});