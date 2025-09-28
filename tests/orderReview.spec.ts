import { test, expect } from '@playwright/test';
import { OrderReviewPage } from './pages/OrderReviewPage';

test.describe('Order Review Page', () => {
  test.beforeEach(async ({ page }) => {
    // Log console errors for debugging
    page.on('console', msg => console.log(`Console: ${msg.text()}`));
    page.on('pageerror', err => console.log(`Page Error: ${err.message}`));

    // Mock image assets to avoid 404 errors
    await page.route('**/assets/orderReviewIcons/*.svg', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'image/svg+xml',
        body: '<svg></svg>',
      })
    );

    // Navigate to login page and authenticate
    await page.goto('/admin-login', { waitUntil: 'networkidle', timeout: 15000 });
    await page.fill('input[name="email"]', 'test@user.com'); // Adjust selector
    await page.fill('input[name="password"]', 'password'); // Adjust selector
    await page.click('button[type="submit"]'); // Adjust selector

    // Wait for login success console log
    await page.waitForEvent('console', { predicate: msg => msg.text().includes('Admin login successful!'), timeout: 10000 });

    // Manually navigate to /admin/orders
    await page.goto('/admin/orders', { waitUntil: 'networkidle', timeout: 15000 });

    // Log current URL and page content for debugging
    const currentUrl = await page.url();
    console.log('Current URL after navigation: ', currentUrl);
    const isContainerVisible = await page.locator('.p-4').isVisible({ timeout: 5000 }).catch(() => false);
    if (!isContainerVisible) {
      console.log('Warning: .p-4 not found. Logging page content.');
      const content = await page.content();
      console.log('Page HTML:', content);
    }

    // Wait for the order review container
    await expect(page.locator('.p-4')).toBeVisible({ timeout: 10000 });
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Take screenshot on failure
    if (testInfo.status === 'failed') {
      try {
        await page.screenshot({
          path: `test-results/screenshot-${testInfo.title.replace(/\s/g, '-')}-${Date.now()}.png`,
          fullPage: true
        });
      } catch (error) {
        console.log(`Failed to take screenshot: ${String(error)}`);
      }
    }
  });

  test('should load the page and display header correctly', async ({ page }) => {
    const orderReviewPage = new OrderReviewPage(page);

    // Verify header title and subtitle
    await expect(orderReviewPage.headerTitle).toHaveText('Order Review');
    await expect(orderReviewPage.headerSubtitle).toHaveText('Review and approve pending orders');
  });

  test('should display search and filter inputs correctly', async ({ page }) => {
    const orderReviewPage = new OrderReviewPage(page);

    // Verify search input
    await expect(orderReviewPage.searchInput).toBeVisible();
    await expect(orderReviewPage.searchInput).toHaveAttribute('placeholder', 'Search orders...');

    // Verify filter button
    await expect(orderReviewPage.filterButton).toBeVisible();
    await expect(orderReviewPage.filterButton).toHaveText('Filter');
  });

  test('should display orders list correctly', async ({ page }) => {
    const orderReviewPage = new OrderReviewPage(page);

    // Verify orders count
    await expect(orderReviewPage.orderCards).toHaveCount(2);

    // Verify first order (ORD-001)
    await expect(orderReviewPage.getOrderNumber(0)).toHaveText('ORD-001');
    await expect(orderReviewPage.getBusinessName(0)).toHaveText('R. Electronics');
    await expect(orderReviewPage.getStatusBadge(0)).toHaveText('pending');
    await expect(orderReviewPage.getOrderDetail(0, 'Customer')).toHaveText('Afnan Sayed');
    await expect(orderReviewPage.getOrderDetail(0, 'Address')).toHaveText('123 Main St, Cairo');
    await expect(orderReviewPage.getOrderDetail(0, 'Weight')).toHaveText('2.5 kg');
    await expect(orderReviewPage.getOrderDetail(0, 'Distance')).toHaveText('15.2 km');
    await expect(orderReviewPage.getDescription(0)).toHaveText('Smartphone and accessories');
    await expect(orderReviewPage.getPrice(0)).toHaveText('Price: $45');
    await expect(orderReviewPage.getApproveButton(0)).toBeVisible();
    await expect(orderReviewPage.getRejectButton(0)).toBeVisible();
    
    // Verify second order (ORD-002)
    await expect(orderReviewPage.getOrderNumber(1)).toHaveText('ORD-002');
    await expect(orderReviewPage.getBusinessName(1)).toHaveText('Gaming Hub');
    await expect(orderReviewPage.getStatusBadge(1)).toHaveText('approved');
    await expect(orderReviewPage.getOrderDetail(1, 'Customer')).toHaveText('Hamza Sayed');
    await expect(orderReviewPage.getOrderDetail(1, 'Address')).toHaveText('456 Stanly Bridge, Alexandria');
    await expect(orderReviewPage.getOrderDetail(1, 'Weight')).toHaveText('1.2 kg');
    await expect(orderReviewPage.getOrderDetail(1, 'Distance')).toHaveText('8.7 km');
    await expect(orderReviewPage.getDescription(1)).toHaveText('Accessories items');
    await expect(orderReviewPage.getPrice(1)).toHaveText('Price: $25');
    await expect(orderReviewPage.getStatusDisplay(1)).toHaveText('Order approved');
  });
});