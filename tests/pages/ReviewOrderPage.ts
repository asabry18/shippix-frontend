import { Page, Locator, expect } from '@playwright/test';
import { CreateOrderPage } from './CreateOrderPage'; // Import if in same directory, or adjust path

export class ReviewOrderPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly orderIdText: Locator;
  readonly noOrderDataMessage: Locator;
  readonly createOrderButton: Locator;
  readonly customerSectionTitle: Locator;
  readonly deliverySectionTitle: Locator;
  readonly packageSectionTitle: Locator;
  readonly shippingCostTitle: Locator;
  readonly orderStatusTitle: Locator;
  readonly backButton: Locator;
  readonly approveButton: Locator;
  readonly editButton: Locator;
  readonly draftButton: Locator;
  readonly customerNameValue: Locator;
  readonly emailValue: Locator;
  readonly phoneValue: Locator;
  readonly orderDateValue: Locator;
  readonly streetAddressValue: Locator;
  readonly cityValue: Locator;
  readonly totalDistanceValue: Locator;
  readonly itemsDescriptionValue: Locator;
  readonly packageValueValue: Locator;
  readonly totalWeightValue: Locator;
  readonly shippingCostText: Locator;
  readonly orderStatusText: Locator;
  readonly statusDescription: Locator;
  readonly pageContainer: Locator;
  readonly fallbackContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('h2.review-title');
    this.orderIdText = page.locator('p.order-id');
    this.noOrderDataMessage = page.locator('h3:has-text("No Order Data Found")');
    this.createOrderButton = page.locator('button:has-text("Create Order")');
    this.customerSectionTitle = page.locator('h5.section-title:has-text("Customer Information")');
    this.deliverySectionTitle = page.locator('h5.section-title:has-text("Delivery Information")');
    this.packageSectionTitle = page.locator('h5.section-title:has-text("Package Information")');
    this.shippingCostTitle = page.locator('h5.cost-title:has-text("Shipping Cost")');
    this.orderStatusTitle = page.locator('h5.status-title:has-text("Order Status")');
    this.backButton = page.locator('button.back-btn');
    this.approveButton = page.locator('button.approve-btn');
    this.editButton = page.locator('button.edit-btn');
    this.draftButton = page.locator('button.draft-btn');
    this.customerNameValue = page.locator('.info-value:has-text("John Doe")');
    this.emailValue = page.locator('.info-value:has-text("john.doe@example.com")');
    this.phoneValue = page.locator('.info-value:has-text("123-456-7890")');
    this.orderDateValue = page.locator('.info-value:has-text("14-8-2025")');
    this.streetAddressValue = page.locator('.info-value:has-text("123 Main St")');
    this.cityValue = page.locator('.info-value:has-text("Cairo")');
    this.totalDistanceValue = page.locator('.info-value:has-text("10")');
    this.itemsDescriptionValue = page.locator('.info-value:has-text("Books and electronics")');
    this.packageValueValue = page.locator('.info-value:has-text("500")');
    this.totalWeightValue = page.locator('.info-value:has-text("2.5")');
    this.shippingCostText = page.locator('h4.cost-amount');
    this.orderStatusText = page.locator('span.status-label:has-text("processing")');
    this.statusDescription = page.locator('small.status-description');
    this.pageContainer = page.locator('.review-order-container');
    this.fallbackContainer = page.locator('body');
  }

  async navigateWithOrderData2(orderData: any) {
    const createOrderPage = new CreateOrderPage(this.page);
    await createOrderPage.navigate();
    await createOrderPage.fillValidFormData2(orderData);
    await createOrderPage.calculateAndNavigateToReview();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    await this.logPageContent();
    const isContainerVisible = await this.pageContainer.isVisible({ timeout: 5000 }).catch(() => false);
    if (!isContainerVisible) {
      console.log('Warning: .review-order-container not found. Checking for redirect or error page.');
      const fallbackContent = await this.fallbackContainer.innerHTML();
      console.log('Fallback page content:', fallbackContent);
    }
    await expect(this.pageContainer).toBeVisible({ timeout: 10000 });
  }

  async navigateWithoutOrderData() {
    await this.page.goto('/review-order', { waitUntil: 'networkidle', timeout: 15000 });
    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    await this.logPageContent();
    await expect(this.noOrderDataMessage).toBeVisible({ timeout: 10000 });
  }

  async logPageContent() {
    const content = await this.page.content();
    console.log('Page HTML:', content);
  }
}