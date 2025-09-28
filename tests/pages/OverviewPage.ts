import { Page, Locator, expect } from '@playwright/test';

export class OverviewPage {
  readonly page: Page;
  readonly headerTitle: Locator;
  readonly headerSubtitle: Locator;
  readonly statsCards: Locator;
  readonly recentOrdersTitle: Locator;
  readonly recentOrdersSubtitle: Locator;
  readonly orderItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.locator('h2.mb-0:has-text("Dashboard Overview")');
    this.headerSubtitle = page.locator('p.text-muted:has-text("Monitor your shipping operations at a glance")');
    this.statsCards = page.locator('.stats-card');
    this.recentOrdersTitle = page.locator('.recent-orders-title');
    this.recentOrdersSubtitle = page.locator('.recent-orders-subtitle');
    this.orderItems = page.locator('.order-item');
  }

  getStatsCardTitle(index: number): Locator {
    return this.statsCards.nth(index).locator('.stats-card-title');
  }

  getStatsCardValue(index: number): Locator {
    return this.statsCards.nth(index).locator('.stats-card-number');
  }

  getStatsCardSubtitle(index: number): Locator {
    return this.statsCards.nth(index).locator('.stats-card-subtitle');
  }

  getStatsCardIcon(index: number): Locator {
    return this.statsCards.nth(index).locator('img');
  }

  getOrderTitle(index: number): Locator {
    return this.orderItems.nth(index).locator('.order-title');
  }

  getOrderSubtitle(index: number): Locator {
    return this.orderItems.nth(index).locator('.order-subtitle');
  }

  getOrderStatus(index: number): Locator {
    return this.orderItems.nth(index).locator('.status-badge');
  }

  getOrderPrice(index: number): Locator {
    return this.orderItems.nth(index).locator('.order-price');
  }

  async navigate() {
    await this.page.goto('/admin/dashboard', { waitUntil: 'networkidle', timeout: 15000 });
    await expect(this.page.locator('.overview-container')).toBeVisible({ timeout: 10000 });
  }
}