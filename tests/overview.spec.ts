import { test, expect } from '@playwright/test';
import { OverviewPage } from './pages/OverviewPage';

test.describe('Overview Page', () => {
  test.beforeEach(async ({ page }) => {
    // Log console errors for debugging
    page.on('console', msg => console.log(`Console: ${msg.text()}`));
    page.on('pageerror', err => console.log(`Page Error: ${err.message}`));

    // Mock image assets to avoid 404 errors
    await page.route('**/assets/overviewIcons/*.svg', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'image/svg+xml',
        body: '<svg></svg>',
      })
    );

    // Navigate to dashboard
    await page.goto('/admin/dashboard', { waitUntil: 'networkidle', timeout: 15000 });
    
    // Wait for the overview container
    await expect(page.locator('.overview-container')).toBeVisible({ timeout: 10000 });
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
    const overviewPage = new OverviewPage(page);

    // Verify header title and subtitle
    await expect(overviewPage.headerTitle).toHaveText('Dashboard Overview');
    await expect(overviewPage.headerSubtitle).toHaveText('Monitor your shipping operations at a glance');
  });

  test('should display stats cards correctly', async ({ page }) => {
    const overviewPage = new OverviewPage(page);

    // Verify stats cards count
    await expect(overviewPage.statsCards).toHaveCount(4);

    // Verify specific stats card data
    await expect(overviewPage.getStatsCardTitle(0)).toHaveText('Total Orders');
    await expect(overviewPage.getStatsCardValue(0)).toHaveText('1,234');
    await expect(overviewPage.getStatsCardSubtitle(0)).toHaveText('+12% from last month');

    await expect(overviewPage.getStatsCardTitle(1)).toHaveText('Active Business Owners');
    await expect(overviewPage.getStatsCardValue(1)).toHaveText('89');
    await expect(overviewPage.getStatsCardSubtitle(1)).toHaveText('+5 new this week');

    await expect(overviewPage.getStatsCardTitle(2)).toHaveText('Pending Reviews');
    await expect(overviewPage.getStatsCardValue(2)).toHaveText('23');
    await expect(overviewPage.getStatsCardSubtitle(2)).toHaveText('Requires attention');

    await expect(overviewPage.getStatsCardTitle(3)).toHaveText('Revenue');
    await expect(overviewPage.getStatsCardValue(3)).toHaveText('$45,231');
    await expect(overviewPage.getStatsCardSubtitle(3)).toHaveText('+8% from last month');
  });

  test('should display recent orders correctly', async ({ page }) => {
    const overviewPage = new OverviewPage(page);

    // Verify recent orders title and subtitle
    await expect(overviewPage.recentOrdersTitle).toHaveText('Recent Orders');
    await expect(overviewPage.recentOrdersSubtitle).toHaveText('Latest orders requiring your attention');

    // Verify recent orders count
    await expect(overviewPage.orderItems).toHaveCount(3);

    // Verify specific order data
    await expect(overviewPage.getOrderTitle(0)).toHaveText('ORD-001 - Afnan');
    await expect(overviewPage.getOrderSubtitle(0)).toHaveText('R. Electronics');
    await expect(overviewPage.getOrderStatus(0)).toHaveText('pending');
    await expect(overviewPage.getOrderPrice(0)).toHaveText('$45');

    await expect(overviewPage.getOrderTitle(1)).toHaveText('ORD-002 - Hamza');
    await expect(overviewPage.getOrderSubtitle(1)).toHaveText('Gaming Hub');
    await expect(overviewPage.getOrderStatus(1)).toHaveText('approved');
    await expect(overviewPage.getOrderPrice(1)).toHaveText('$25');

    await expect(overviewPage.getOrderTitle(2)).toHaveText('ORD-003 - Maya');
    await expect(overviewPage.getOrderSubtitle(2)).toHaveText('Book Store');
    await expect(overviewPage.getOrderStatus(2)).toHaveText('in-transit');
    await expect(overviewPage.getOrderPrice(2)).toHaveText('$30');
  });
});