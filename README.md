# 🎭 Playwright E2E Automation Suite - Appointments Module

This repository contains the End-to-End (E2E) automated test suite for the **Appointments** module, built with **Playwright** and **TypeScript** following the **Page Object Model (POM)** design pattern.

---

## 📌 1. Project Overview & Architecture

The main goal of this suite is to ensure quality and stability across critical appointment lifecycle flows (Creation, Rescheduling, and Cancellation), providing a maintainable, scalable, and fully deterministic codebase free of flakiness.

### 🏛️ Design Pattern: Page Object Model (POM)
To abstract the application's UI logic from the test assertions, the project is structured as follows:

* **`pages/`**: Contains locator definitions and page-specific interactions.
  * `LoginPage.ts`: Encapsulates authentication and post-logout redirection state assertions.
  * `AppointmentPage.ts`: Handles the appointment creation form using dynamic date utilities.
  * `AppointmentsListPage.ts`: Controls list interactions, status-based card filtering (`Active`), inline forms, and success banner assertions.
  * `components/SidebarComponent.ts`: Global component for sidebar navigation and session termination.
* **`tests/`**: Contains test specifications (`*.spec.ts`) focused strictly on business assertions.
* **`utils/`**: Helper utilities for dynamic test data generation (e.g., future dates).

### 🛡️ Key Engineering Decisions
1. **Defensive Locators & Scoping:** Combines accessibility-first queries (`getByRole`, `getByText`) with structural CSS anchors (`div.shadow-custom`) to isolate individual card DOM sub-trees and prevent cross-card interaction errors.
2. **Strict Status Filtering:** Actions such as *Reschedule* or *Cancel* explicitly filter cards matching the **`Active`** status badge, guaranteeing tests never attempt to interact with `Completed` or `Cancelled` items.
3. **Test Isolation:**
   * **`beforeEach`**: Automatically handles authentication prior to every test.
   * **`afterEach`**: Executes automated logout (`SidebarComponent.clickLogout()`) and asserts redirection to `/login`, ensuring clean session boundaries and independent execution.

---

## 📋 2. Prerequisites

Ensure you have the following software installed locally:

* **Node.js**: Version `18.x` or higher (Recommended: LTS v20+).
* **npm**: Version `9.x` or higher (usually bundled with Node.js).
* **Git**: For version control.

Verify your local setup:
```bash
node -v
npm -v
```

---

## 🚀 3. Installation & Setup Guide

Follow these steps to clone and run the project locally:

### Step 1: Clone the repository
```bash
git clone https://github.com/Ramirog22/qa-challenge.git
cd qa-challenge
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Install Playwright browsers
```bash
npx playwright install
```

### Step 4: Configure Environment Variables
Create a `.env` file in the project root directory following this template:

```env
BASE_URL=https://light-it-qa-challenge.vercel.app
TEST_USER="your_email@domain.com"
TEST_PASSWORD="your_secure_password"
```

> ⚠️ **Security Note:** The `.env` file is excluded from version control via `.gitignore` to prevent committing sensitive credentials.

---

## 🧪 4. Test Execution Commands

### ⚡ Run tests in Headless Mode (CI / Background Execution)
Executes the full test suite in headless mode (no visible browser window):
```bash
npx playwright test
```

### 🖥️ Run tests in Headed Mode (Visible Browser)
Opens the browser GUI to observe test interactions live:
```bash
npx playwright test --headed
```

### 🎛️ Playwright UI Mode (Interactive Debugging)
Launches the interactive Playwright UI runner with time-travel debugging, DOM inspection, and step-by-step logs:
```bash
npx playwright test --ui
```

### 🎯 Run the Appointments Suite only
To execute only the appointment-related tests:
```bash
npx playwright test tests/appointments.spec.ts --headed
```

### 🔍 Filter execution by test name
Filter and execute specific test cases using the `-g` flag:
```bash
npx playwright test -g "reschedule" --headed
```

---

## 📊 5. Test Reports

Upon test completion, Playwright automatically generates an HTML report with metrics, screenshots, and execution traces.

To view the latest report in your browser, run:
```bash
npx playwright show-report
```

---

## 📁 Project Structure

```text
.
├── pages/
│   ├── components/
│   │   └── SidebarComponent.ts
│   ├── AppointmentPage.ts
│   ├── AppointmentsListPage.ts
│   └── LoginPage.ts
├── tests/
│   └── appointments.spec.ts
├── utils/
│   └── dateUtils.ts
├── .env
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
```
