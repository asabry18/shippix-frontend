
import { Page, Locator, expect } from '@playwright/test';

export class CreateOrderPage {
  readonly page: Page;

  // Page elements
  readonly pageTitle: Locator;
  readonly pageSubtitle: Locator;
  readonly backButton: Locator;
  readonly calculateButton: Locator;
  readonly calculateNote: Locator;
  readonly nextButton: Locator;
  readonly shippingCostCard: Locator;
  readonly shippingCostText: Locator;

  // Customer Information
  readonly customerSectionTitle: Locator;
  readonly customerNameInput: Locator;
  readonly customerNameError: Locator;
  readonly emailInput: Locator;
  readonly emailError: Locator;
  readonly phoneInput: Locator;
  readonly phoneError: Locator;

  // Delivery Information
  readonly deliverySectionTitle: Locator;
  readonly streetAddressInput: Locator;
  readonly streetAddressError: Locator;
  readonly citySelect: Locator;
  readonly notesInput: Locator;

  // Package Information
  readonly packageSectionTitle: Locator;
  readonly itemsDescriptionInput: Locator;
  readonly itemsDescriptionError: Locator;
  readonly packageValueInput: Locator;
  readonly totalWeightInput: Locator;
  readonly totalWeightError: Locator;

  constructor(page: Page) {
    this.page = page;

    // Page level elements
    this.pageTitle = page.locator('.page-title');
    this.pageSubtitle = page.locator('.page-subtitle');
    this.backButton = page.locator('.back-btn');
    this.calculateButton = page.locator('.calculate-btn');
    this.calculateNote = page.locator('.calculate-note');
    this.nextButton = page.locator('.next-btn');
    this.shippingCostCard = page.locator('.shipping-cost-card');
    this.shippingCostText = page.locator('.shipping-price');

    // Customer Information
    this.customerSectionTitle = page.locator('.info-card h5:has-text("Customer Information")');
    this.customerNameInput = page.locator('input[name="customerName"]');
    this.customerNameError = page.locator('input[name="customerName"] + .invalid-feedback');
    this.emailInput = page.locator('input[name="emailAddress"]');
    this.emailError = page.locator('input[name="emailAddress"] + .invalid-feedback');
    this.phoneInput = page.locator('input[name="phoneNumber"]');
    this.phoneError = page.locator('input[name="phoneNumber"] + .invalid-feedback');

    // Delivery Information
    this.deliverySectionTitle = page.locator('.info-card h5:has-text("Delivery Information")');
    this.streetAddressInput = page.locator('input[name="streetAddress"]');
    this.streetAddressError = page.locator('input[name="streetAddress"] + .invalid-feedback');
    this.citySelect = page.locator('select[name="city"]');
    this.notesInput = page.locator('textarea[name="notesToDriver"]');

    // Package Information
    this.packageSectionTitle = page.locator('.info-card h5:has-text("Package Information")');
    this.itemsDescriptionInput = page.locator('textarea[name="itemsDescription"]');
    this.itemsDescriptionError = page.locator('textarea[name="itemsDescription"] + .invalid-feedback');
    this.packageValueInput = page.locator('input[name="packageValue"]');
    this.totalWeightInput = page.locator('input[name="totalWeight"]');
    this.totalWeightError = page.locator('input[name="totalWeight"] + .invalid-feedback');
  }

  async fillValidFormData(): Promise<void> {
    await this.customerNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.customerNameInput.fill('John Doe');
    await this.emailInput.fill('john.doe@example.com');
    await this.phoneInput.fill('01234567890');
    await this.streetAddressInput.fill('123 Main Street');
    await this.citySelect.selectOption('Cairo');
    await this.itemsDescriptionInput.fill('Electronics and Books');
    await this.packageValueInput.fill('1000');
    await this.totalWeightInput.fill('5.5');
  }

  async navigate() {
    await this.page.goto('/create-order', { waitUntil: 'networkidle', timeout: 15000 });
    await expect(this.page.locator('.create-order-page')).toBeVisible({ timeout: 10000 });
  }

  async fillValidFormData2(orderData: any) {
    await this.customerNameInput.fill(orderData.customerName);
    await this.emailInput.fill(orderData.emailAddress);
    await this.phoneInput.fill(orderData.phoneNumber);
    await this.streetAddressInput.fill(orderData.streetAddress);
    await this.citySelect.selectOption(orderData.city);
    await this.notesInput.fill(orderData.notesToDriver);
    await this.itemsDescriptionInput.fill(orderData.itemsDescription);
    await this.packageValueInput.fill(orderData.packageValue);
    await this.totalWeightInput.fill(orderData.totalWeight);
  }

  async calculateAndNavigateToReview() {
    await this.calculateButton.click();
    await this.page.waitForTimeout(2000); // Wait for calculation
    await expect(this.shippingCostCard).toBeVisible();
    await this.nextButton.click();
    await expect(this.page).toHaveURL(/review-order/, { timeout: 10000 });
  }
}