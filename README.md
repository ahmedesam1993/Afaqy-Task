## 🎭 Automation Exercise — Playwright TypeScript Framework
An end-to-end test automation framework built with Playwright and TypeScript, targeting the Automation Exercise website. The framework follows the Page Object Model (POM) pattern combined with Data-Driven Testing to ensure clean, maintainable, and scalable test code.

## ✨ Features

✅ Page Object Model (POM) architecture
✅ Data-Driven Testing with dynamic random data generation
✅ Serial test execution with shared browser context
✅ Allure reporting integration
✅ Centralized Page Object Manager
✅ Full TypeScript support with strict typing
✅ Screenshot & video capture on failure

## 🗂️ Project Structure
```bash
├── src/
│   ├── data/
│   │   └── testData.ts                  # Test data builders & interfaces
│   │
│   ├── pages/
│   │   ├── HomePage.ts                  # Home page actions & assertions
│   │   ├── LoginPage.ts                 # Login / Signup page actions & assertions
│   │   ├── RegisterationInfoPage.ts     # Registration form actions & assertions
│   │   ├── PageObjectManager.ts         # Centralized manager for all page objects
│   │   └── index.ts                     # Barrel export file
│   │
│   └── tests/
│       └── registerLoginLogout.spec.ts  # Main test suite
│
├── allure-results/                      # Raw Allure results (auto-generated)
├── allure-report/                       # Final Allure HTML report (auto-generated)
├── reports/
│   └── test-artifacts/                  # Screenshots & videos on failure
│
├── playwright.config.ts                 # Playwright configuration
├── tsconfig.json                        # TypeScript configuration
├── package.json                         # Project dependencies & scripts
└── README.md

```


## 🧪 Test Scenarios
- ** Test Case       Description
- **TC-001          Register a new user, verify account creation, and assert the user is logged in
- **TC-002          Logout the logged-in user and validate successful logout

## Installation

bash# 1. Clone the repository
```bash
git clone https://github.com/ahmedesam1993/Afaqy-Task.git
cd Afaqy-Task
```

# 2. Install dependencies
```bash
npm install
```
# 3. Install Playwright browsers
```bash
npx playwright install
```


##▶️ Running Tests
```bash
Command                         Description
npm run test                    Run all tests (headless)
npm run test:headed             Run all tests with visible browser
npm run test:report             Run tests + generate & open Allure report
npm run allure:generate         Generate Allure report from existing results
npm run allure:open             Open the last generated Allure report
Run in UI mode (interactive)    Run in UI mode (interactive)
```


