import { test, expect } from '@playwright/test';

test.describe('Shippix Signup Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup'); 
    await page.waitForSelector('[data-testid="logo"]', { timeout: 10000 });
  });

  test('should render welcome section', async ({ page }) => {
    await expect(page.getByTestId('logo')).toBeVisible();
    await expect(page.getByTestId('welcome-title')).toHaveText('Create your Business Account');
    await expect(page.getByTestId('welcome-subtitle')).toHaveText('Join Shippix-Business to manage your shipping');
  });

  test('should render form with all fields', async ({ page }) => {
    await expect(page.getByTestId('signup-form')).toBeVisible();
    await expect(page.getByTestId('personal-info-title')).toHaveText('Personal Information');
    await expect(page.getByTestId('personal-info-subtitle')).toHaveText('Your contact details');
    await expect(page.getByTestId('business-info-title')).toHaveText('Business Information');
    await expect(page.getByTestId('business-info-subtitle')).toHaveText('Tell us about your business');

    await expect(page.getByTestId('owner-name-input')).toBeVisible();
    await expect(page.getByTestId('email-input')).toBeVisible();
    await expect(page.getByTestId('phone-number-input')).toBeVisible();
    await expect(page.getByTestId('national-id-input')).toBeVisible();
    await expect(page.getByTestId('password-input')).toBeVisible();
    await expect(page.getByTestId('confirm-password-input')).toBeVisible();
    await expect(page.getByTestId('business-name-input')).toBeVisible();
    await expect(page.getByTestId('business-type-select')).toBeVisible();
    await expect(page.getByTestId('pickup-location-input')).toBeVisible();
    await expect(page.getByTestId('submit-button')).toBeVisible();
    await expect(page.getByTestId('sign-in-link')).toBeVisible();
  });

  test('should disable submit button when form is incomplete', async ({ page }) => {
    // Check initial disabled state
    await expect(page.getByTestId('submit-button')).toBeDisabled();

    // Partially fill form
    await page.getByTestId('owner-name-input').fill('John Doe');
    await expect(page.getByTestId('submit-button')).toBeDisabled();

    // Fill more fields but still incomplete
    await page.getByTestId('email-input').fill('john.doe@example.com');
    await page.getByTestId('phone-number-input').fill('1234567890');
    await expect(page.getByTestId('submit-button')).toBeDisabled();
  });


  test('should toggle password visibility', async ({ page }) => {
    const passwordInput = page.getByTestId('password-input');
    const confirmPasswordInput = page.getByTestId('confirm-password-input');
    const passwordToggle = page.getByTestId('password-toggle');
    const confirmPasswordToggle = page.getByTestId('confirm-password-toggle');

    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(confirmPasswordInput).toHaveAttribute('type', 'password');

    await passwordToggle.click();
    await confirmPasswordToggle.click();

    await expect(passwordInput).toHaveAttribute('type', 'text');
    await expect(confirmPasswordInput).toHaveAttribute('type', 'text');

    await passwordToggle.click();
    await confirmPasswordToggle.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
    await expect(confirmPasswordInput).toHaveAttribute('type', 'password');
  });

  test('should enable submit button when form is complete', async ({ page }) => {
    await page.getByTestId('owner-name-input').fill('John Doe');
    await page.getByTestId('email-input').fill('john.doe@example.com');
    await page.getByTestId('phone-number-input').fill('1234567890');
    await page.getByTestId('national-id-input').fill('12345678901234');
    await page.getByTestId('password-input').fill('Password123!');
    await page.getByTestId('confirm-password-input').fill('Password123!');
    await page.getByTestId('business-name-input').fill('My Business');
    await page.getByTestId('business-type-select').selectOption('retail');
    await page.getByTestId('pickup-location-input').fill('123 Main St, City');

    await expect(page.getByTestId('submit-button')).toBeEnabled();
    await expect(page.getByTestId('submit-button')).toHaveText('Create Business Account');
  });

  test('should handle form submission locally', async ({ page }) => {
    await page.getByTestId('owner-name-input').fill('John Doe');
    await page.getByTestId('email-input').fill('john.doe@example.com');
    await page.getByTestId('phone-number-input').fill('1234567890');
    await page.getByTestId('national-id-input').fill('12345678901234');
    await page.getByTestId('password-input').fill('Password123!');
    await page.getByTestId('confirm-password-input').fill('Password123!');
    await page.getByTestId('business-name-input').fill('My Business');
    await page.getByTestId('business-type-select').selectOption('retail');
    await page.getByTestId('pickup-location-input').fill('123 Main St, City');

    await expect(page.getByTestId('submit-button')).toBeEnabled();
    await page.getByTestId('submit-button').click();

    // Since no backend is involved, check for loading state and remain on page
    await expect(page.getByTestId('submit-button')).toContainText('Create Business Account');

    // Wait briefly to allow UI updates, then check if still on signup page
    await page.waitForTimeout(500); // Allow time for UI to update
    await expect(page).toHaveURL(/\/signup/); // No navigation without backend
  });

  test('should navigate to login when clicking Sign In link', async ({ page }) => {
    await page.getByTestId('sign-in-link').click();
    await page.waitForURL('**/login', { timeout: 10000 });
    await expect(page).toHaveURL(/\/login/);
  });
});