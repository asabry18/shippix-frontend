import { test, expect } from '@playwright/test';
import { ReviewOrderPage } from './pages/ReviewOrderPage';

// Mock order data for testing
const mockOrderData = {
  customerName: 'John Doe',
  emailAddress: 'john.doe@example.com',
  phoneNumber: '123-456-7890',
  streetAddress: '123 Main St',
  city: 'Cairo',
  notesToDriver: 'Leave at front door',
  itemsDescription: 'Books and electronics',
  packageValue: '500',
  totalWeight: '2.5',
  shippingCost: 100.50,
  totalDistance: 10,
  orderId: '123456'
};

test.describe('ReviewOrder Page', () => {
  test.beforeEach(async ({ page }) => {
    // Log console errors for debugging
    page.on('console', msg => console.log(`Console: ${msg.text()}`));
    page.on('pageerror', err => console.log(`Page Error: ${err.message}`));
  });

  test('should display no order data message when orderData is null', async ({ page }) => {
    const reviewOrderPage = new ReviewOrderPage(page);

    // Navigate without order data
    await reviewOrderPage.navigateWithoutOrderData();

    // Verify no order data message and button
    await expect(reviewOrderPage.noOrderDataMessage).toHaveText('No Order Data Found');
    await expect(reviewOrderPage.createOrderButton).toBeVisible();

    // Test navigation to create-order
    await reviewOrderPage.createOrderButton.click();
    await expect(page).toHaveURL(/.*create-order/, { timeout: 10000 });
  });

  test('should load the page and display sections correctly', async ({ page }) => {
    const reviewOrderPage = new ReviewOrderPage(page);

    // Navigate with order data
    await reviewOrderPage.navigateWithOrderData2(mockOrderData);

    // Verify page title and order ID
    await expect(reviewOrderPage.pageTitle).toHaveText('Review Order');
    await expect(reviewOrderPage.orderIdText).toHaveText('Order #123456');

    // Verify section headers
    await expect(reviewOrderPage.customerSectionTitle).toHaveText('Customer Information');
    await expect(reviewOrderPage.deliverySectionTitle).toHaveText('Delivery Information');
    await expect(reviewOrderPage.packageSectionTitle).toHaveText('Package Information');
    await expect(reviewOrderPage.shippingCostTitle).toHaveText('Shipping Cost');
    await expect(reviewOrderPage.orderStatusTitle).toHaveText('Order Status');

    // Verify buttons
    await expect(reviewOrderPage.backButton).toBeVisible();
    await expect(reviewOrderPage.approveButton).toBeVisible();
    await expect(reviewOrderPage.editButton).toBeVisible();
    await expect(reviewOrderPage.draftButton).toBeVisible();
  });

  test('should display customer information correctly', async ({ page }) => {
    const reviewOrderPage = new ReviewOrderPage(page);

    // Navigate with order data
    await reviewOrderPage.navigateWithOrderData2(mockOrderData);

    // Verify customer information
    await expect(reviewOrderPage.customerNameValue).toHaveText('John Doe');
    await expect(reviewOrderPage.emailValue).toHaveText('john.doe@example.com');
    await expect(reviewOrderPage.phoneValue).toHaveText('123-456-7890');
    await expect(reviewOrderPage.orderDateValue).toHaveText('14-8-2025');
  });

  test('should display delivery information correctly', async ({ page }) => {
    const reviewOrderPage = new ReviewOrderPage(page);

    // Navigate with order data
    await reviewOrderPage.navigateWithOrderData2(mockOrderData);

    // Verify delivery information
    await expect(reviewOrderPage.streetAddressValue).toHaveText('123 Main St');
    await expect(reviewOrderPage.cityValue).toHaveText('Cairo');
  });

  test('should display package information correctly', async ({ page }) => {
    const reviewOrderPage = new ReviewOrderPage(page);

    // Navigate with order data
    await reviewOrderPage.navigateWithOrderData2(mockOrderData);

    // Verify package information
    await expect(reviewOrderPage.itemsDescriptionValue).toHaveText('Books and electronics');
    await expect(reviewOrderPage.packageValueValue).toHaveText('500');
    await expect(reviewOrderPage.totalWeightValue).toHaveText('2.5');
  });

  test('should display order status correctly', async ({ page }) => {
    const reviewOrderPage = new ReviewOrderPage(page);

    // Navigate with order data
    await reviewOrderPage.navigateWithOrderData2(mockOrderData);

    // Verify order status
    await expect(reviewOrderPage.orderStatusText).toHaveText('processing');
    await expect(reviewOrderPage.statusDescription).toHaveText('Awaiting review and approval');
  });

  test('should navigate back to create-order when back button is clicked', async ({ page }) => {
    const reviewOrderPage = new ReviewOrderPage(page);

    // Navigate with order data
    await reviewOrderPage.navigateWithOrderData2(mockOrderData);

    // Click back button
    await reviewOrderPage.backButton.click();

    // Verify navigation
    await expect(page).toHaveURL(/.*create-order/, { timeout: 10000 });
  });

  test('should navigate to payment when Approve & Create Shipment button is clicked', async ({ page }) => {
    const reviewOrderPage = new ReviewOrderPage(page);

    // Navigate with order data
    await reviewOrderPage.navigateWithOrderData2(mockOrderData);

    // Click approve button
    await reviewOrderPage.approveButton.click();

    // Verify navigation
    await expect(page).toHaveURL(/.*payment/, { timeout: 10000 });
  });

  test('should navigate to create-order when Edit Order Details button is clicked', async ({ page }) => {
    const reviewOrderPage = new ReviewOrderPage(page);

    // Navigate with order data
    await reviewOrderPage.navigateWithOrderData2(mockOrderData);

    // Click edit button
    await reviewOrderPage.editButton.click();

    // Verify navigation
    await expect(page).toHaveURL(/.*create-order/, { timeout: 10000 });
  });

  test('should navigate to dashboard when Save as Draft button is clicked', async ({ page }) => {
    const reviewOrderPage = new ReviewOrderPage(page);

    // Navigate with order data
    await reviewOrderPage.navigateWithOrderData2(mockOrderData);

    // Click draft button
    await reviewOrderPage.draftButton.click();

    // Verify navigation
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
  });
});