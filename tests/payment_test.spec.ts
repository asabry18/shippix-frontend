import { test, expect } from '@playwright/test';
import { CreateOrderPage } from './pages/CreateOrderPage';
import { ReviewOrderPage } from './pages/ReviewOrderPage';

// Define the expected structure of the navigation state
interface NavigationState {
  newOrder: {
    orderId: string;
    customerName: string;
    city: string;
    itemsDescription: string;
    shippingCost: number;
    paymentMethod: string;
    completedAt: string;
  };
}

// Extend Window interface for navigation state capturing
interface ExtendedWindow extends Window {
  __lastNavigationState?: NavigationState;
  __lastNavigationUrl?: string | undefined;
}

// Full mock data with all required fields
const mockOrderData = {
  customerName: 'John Doe',
  emailAddress: 'john.doe@example.com',
  phoneNumber: '123-456-7890',
  streetAddress: '123 Main St',
  city: 'Cairo',
  notesToDriver: 'Leave at front door',
  itemsDescription: '2 items',
  packageValue: '500',
  totalWeight: '2.5',
  shippingCost: 35.0,
  totalDistance: 10,
  orderId: '123456'
};

test.describe('Payment Page', () => {
  test.beforeEach(async ({ page }) => {
    // Mock image assets to avoid 404 errors
    await page.route('**/assets/payment/*.svg', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'image/svg+xml',
        body: '<svg></svg>',
      })
    );

    // Log console and page errors for debugging
    page.on('console', (msg) => console.log(`Console: ${msg.text()}`));
    page.on('pageerror', (err) => console.log(`Page Error: ${err.message}`));

    // Navigate to create-order and fill form to simulate realistic flow
    const createOrderPage = new CreateOrderPage(page);
    await createOrderPage.navigate();
    await createOrderPage.fillValidFormData2(mockOrderData);
    await createOrderPage.calculateAndNavigateToReview();

    // Navigate to review-order and proceed to payment
    const reviewOrderPage = new ReviewOrderPage(page);
    await reviewOrderPage.approveButton.click();
    await expect(page).toHaveURL(/.*payment/, { timeout: 10000 });

    // Wait for payment page to load
    await page.waitForSelector('.payment-content', { timeout: 15000 });
    const isPaymentContentVisible = await page.locator('.payment-content').isVisible({ timeout: 5000 }).catch(() => false);
    if (!isPaymentContentVisible) {
      console.log('Warning: .payment-content not found. Logging page content.');
      const content = await page.content();
      console.log('Page HTML:', content);
    }
    await expect(page.locator('.payment-title')).toBeVisible({ timeout: 10000 });
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Take screenshot on failure, if page is not closed
    if (testInfo.status === 'failed') {
      try {
        await page.screenshot({
          path: `test-results/screenshot-${testInfo.title.replace(/\s/g, '-')}-${Date.now()}.png`,
          fullPage: true,
        });
      } catch (error) {
        console.log(`Failed to take screenshot: ${String(error)}`);
      }
    }
  });

  test('should display no payment data message when paymentData is null', async ({ page }) => {
    // Navigate directly to payment with null data
    await page.goto('/payment', { waitUntil: 'networkidle', timeout: 15000 });
    await page.evaluate(() => {
      window.history.replaceState({ paymentData: null }, '', '/payment');
    });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForSelector('.payment-content-no-data', { timeout: 10000 });

    // Verify no payment data message
    await expect(page.locator('h3:has-text("No Payment Data Found")')).toBeVisible();
    await expect(page.locator('p:has-text("Please go back and create an order first.")')).toBeVisible();
    await expect(page.locator('button:has-text("Create Order")')).toBeVisible();

    // Test navigation on Create Order button click
    await page.locator('button:has-text("Create Order")').click();
    await expect(page).toHaveURL(/.*create-order/, { timeout: 10000 });
  });

  test('should render payment form with correct data when paymentData is provided', async ({ page }) => {
    // Verify page elements
    await expect(page.locator('.payment-title')).toHaveText('Payment');
    await expect(page.locator('.order-id-text')).toHaveText('Order #123456');
    
    // Verify payment method radio buttons
    await expect(page.locator('#visa')).toBeChecked();
    await expect(page.locator('#fawry')).not.toBeChecked();
    await expect(page.locator('#vodafone')).not.toBeChecked();
    await expect(page.locator('.pay-btn')).toHaveText('Pay 35.00 EGP');
  });

  test('should allow selecting different payment methods', async ({ page }) => {
    // Verify default selection
    await expect(page.locator('#visa')).toBeChecked();

    // Select Fawry
    await page.locator('#fawry').check();
    await expect(page.locator('#fawry')).toBeChecked();
    await expect(page.locator('#visa')).not.toBeChecked();
    await expect(page.locator('#vodafone')).not.toBeChecked();

    // Select Vodafone
    await page.locator('#vodafone').check();
    await expect(page.locator('#vodafone')).toBeChecked();
    await expect(page.locator('#fawry')).not.toBeChecked();
    await expect(page.locator('#visa')).not.toBeChecked();
  });

  test('should navigate to review order when back button is clicked', async ({ page }) => {
    // Click back button
    await page.locator('.back-btn').click();
    await expect(page).toHaveURL(/.*review-order/, { timeout: 10000 });
  });

  test('should submit payment and navigate to dashboard', async ({ page }) => {
    // Mock navigation state capture
    await page.evaluate(() => {
      const originalPushState = window.history.pushState;
      window.history.pushState = (state, _title, url) => {
        (window as ExtendedWindow).__lastNavigationState = state;
        (window as ExtendedWindow).__lastNavigationUrl = url ? String(url) : undefined;
        originalPushState.call(window.history, state, '', url);
      };
    });

    // Select payment method and submit
    await page.locator('#vodafone').check();
    await page.locator('.pay-btn').click();

    // Verify navigation
    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });

    // Verify navigation state
    const navigationState = await page.evaluate(() => (window as ExtendedWindow).__lastNavigationState) as NavigationState;
    expect(navigationState.newOrder.completedAt).toBeDefined();

    // Verify navigation URL
    const navigationUrl = await page.evaluate(() => (window as ExtendedWindow).__lastNavigationUrl);
    expect(navigationUrl).toBe('/dashboard');
  });
});