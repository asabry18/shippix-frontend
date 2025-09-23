import { test, expect } from '@playwright/test';
import { CreateOrderPage } from './pages/CreateOrderPage';

test.describe('Create Order Page', () => {
  test.beforeEach(async ({ page }) => {
    // Log console errors for debugging
    page.on('console', msg => console.log(`Console: ${msg.text()}`));
    page.on('pageerror', err => console.log(`Page Error: ${err.message}`));

    // Navigate to the create order page
    await page.goto('/create-order', { waitUntil: 'networkidle', timeout: 15000 });

    // Wait for the page container
    await expect(page.locator('.create-order-page')).toBeVisible({ timeout: 10000 });
  });

  test.afterEach(async ({ page }) => {
    // Take screenshot on failure
    if (test.info().status === 'failed') {
      await page.screenshot({ path: `test-results/screenshot-${test.info().title.replace(/\s/g, '-')}-${Date.now()}.png`, fullPage: true });
    }
  });

  test('should load the page and display sections correctly', async ({ page }) => {
    const createOrderPage = new CreateOrderPage(page);

    // Verify page title and subtitle
    await expect(createOrderPage.pageTitle).toHaveText('Create New Order');
    await expect(createOrderPage.pageSubtitle).toHaveText('Add a customer order to your system');

    // Verify section headers
    await expect(createOrderPage.customerSectionTitle).toHaveText('Customer Information');
    await expect(createOrderPage.deliverySectionTitle).toHaveText('Delivery Information');
    await expect(createOrderPage.packageSectionTitle).toHaveText('Package Information');

    // Verify back button
    await expect(createOrderPage.backButton).toBeVisible();
  });

  test('should validate customer name field', async ({ page }) => {
    const createOrderPage = new CreateOrderPage(page);

    // Test empty field
    await createOrderPage.customerNameInput.fill('');
    await createOrderPage.customerNameInput.blur();
    await expect(createOrderPage.customerNameError).toHaveText('Customer Name must not be blank.');

    // Test numbers
    await createOrderPage.customerNameInput.fill('John123');
    await createOrderPage.customerNameInput.blur();
    await expect(createOrderPage.customerNameError).toHaveText('Customer Name numbers are not allowed.');

    // Test valid input
    await createOrderPage.customerNameInput.fill('John Doe');
    await createOrderPage.customerNameInput.blur();
    await expect(createOrderPage.customerNameError).toBeHidden();
  });

  test('should validate email and phone fields', async ({ page }) => {
    const createOrderPage = new CreateOrderPage(page);

    // Test invalid email
    await createOrderPage.emailInput.fill('invalid-email');
    await createOrderPage.emailInput.blur();
    await expect(createOrderPage.emailError).toHaveText(/valid email format/);

    // Test invalid phone (too short)
    await createOrderPage.phoneInput.fill('12345');
    await createOrderPage.phoneInput.blur();
    await expect(createOrderPage.phoneError).toHaveText('Customer Phone Number must be 10-12 digits long.');

    // Test valid inputs
    await createOrderPage.emailInput.fill('john.doe@example.com');
    await createOrderPage.emailInput.blur();
    await expect(createOrderPage.emailError).toBeHidden();
    await createOrderPage.phoneInput.fill('01234567890');
    await createOrderPage.phoneInput.blur();
    await expect(createOrderPage.phoneError).toBeHidden();
  });

  test('should validate delivery address and weight fields', async ({ page }) => {
    const createOrderPage = new CreateOrderPage(page);

    // Test empty street address
    await createOrderPage.streetAddressInput.fill('');
    await createOrderPage.streetAddressInput.blur();
    await expect(createOrderPage.streetAddressError).toHaveText('Delivery Address must not be blank.');

    // Test valid inputs
    await createOrderPage.streetAddressInput.fill('123 Main Street');
    await createOrderPage.streetAddressInput.blur();
    await expect(createOrderPage.streetAddressError).toBeHidden();
    await createOrderPage.totalWeightInput.fill('5.5');
    await createOrderPage.totalWeightInput.blur();
    await expect(createOrderPage.totalWeightError).toBeHidden();
  });

  test('should validate items description field', async ({ page }) => {
    const createOrderPage = new CreateOrderPage(page);

    // Test empty field
    await createOrderPage.itemsDescriptionInput.fill('');
    await createOrderPage.itemsDescriptionInput.blur();
    await expect(createOrderPage.itemsDescriptionError).toHaveText('Order Description must not be blank.');

    // Test valid input
    await createOrderPage.itemsDescriptionInput.fill('Electronics and Books');
    await createOrderPage.itemsDescriptionInput.blur();
    await expect(createOrderPage.itemsDescriptionError).toBeHidden();
  });

  test('should enable calculate button when form is valid', async ({ page }) => {
    const createOrderPage = new CreateOrderPage(page);

    // Verify calculate button is initially disabled
    await expect(createOrderPage.calculateButton).toBeDisabled();

    // Fill valid form data
    await createOrderPage.fillValidFormData();

    // Verify calculate button is enabled
    await expect(createOrderPage.calculateButton).toBeEnabled();
  });

  test('should calculate shipping cost successfully', async ({ page }) => {
    const createOrderPage = new CreateOrderPage(page);

    // Fill valid form data
    await createOrderPage.fillValidFormData();

    // Click calculate button
    await createOrderPage.calculateButton.click();

    // Verify loading state
    await expect(createOrderPage.calculateButton).toHaveText('Calculating...');

    // Wait for calculation (1500ms + buffer)
    await page.waitForTimeout(2000);

    // Verify shipping cost card and text
    await expect(createOrderPage.shippingCostCard).toBeVisible();
    await expect(createOrderPage.shippingCostText).toContainText('EGP');

    // Verify Next button
    await expect(createOrderPage.nextButton).toBeVisible();
  });

  test('should navigate to review order after calculation', async ({ page }) => {
    const createOrderPage = new CreateOrderPage(page);

    // Fill valid form data
    await createOrderPage.fillValidFormData();

    // Calculate shipping
    await createOrderPage.calculateButton.click();
    await page.waitForTimeout(2000);

    // Click Next button
    await createOrderPage.nextButton.click();

    // Verify navigation
    await expect(page).toHaveURL(/.*review-order/, { timeout: 10000 });
  });

  test('should handle optional notes field correctly', async ({ page }) => {
    const createOrderPage = new CreateOrderPage(page);

    // Fill valid form data but leave notes empty
    await createOrderPage.fillValidFormData();
    await createOrderPage.notesInput.fill('');

    // Verify calculate button is enabled
    await expect(createOrderPage.calculateButton).toBeEnabled();

    // Calculate shipping
    await createOrderPage.calculateButton.click();
    await page.waitForTimeout(2000);

    // Verify shipping cost card
    await expect(createOrderPage.shippingCostCard).toBeVisible();
  });

  test('should navigate back to dashboard', async ({ page }) => {
    const createOrderPage = new CreateOrderPage(page);

    // Click back button
    await createOrderPage.backButton.click();

    // Verify navigation
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
  });

  test('should select city from dropdown', async ({ page }) => {
    const createOrderPage = new CreateOrderPage(page);

        // Verify dropdown options
    const options = await createOrderPage.citySelect.evaluate((select: HTMLSelectElement) => {
      return Array.from(select.options).map(option => option.value);
    });
    expect(options).toEqual(['', 'Cairo', 'Alexandria', 'Giza', 'Sharkia', 'Dakahlia', 'Qalyubia', 'Beheira']);
    // Select a city
    await createOrderPage.citySelect.selectOption('Cairo');

    // Verify selection
    await expect(createOrderPage.citySelect).toHaveValue('Cairo');
  });
});
