import { Page, Locator, expect } from '@playwright/test';

export class OrderReviewPage {
  readonly page: Page;
  readonly headerTitle: Locator;
  readonly headerSubtitle: Locator;
  readonly searchInput: Locator;
  readonly searchIcon: Locator;
  readonly filterButton: Locator;
  readonly filterIcon: Locator;
  readonly orderCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.locator('h2.mb-0:has-text("Order Review")');
    this.headerSubtitle = page.locator('p.text-muted:has-text("Review and approve pending orders")');
    this.searchInput = page.locator('.search-input');
    this.searchIcon = page.locator('.search-icon');
    this.filterButton = page.locator('.filter-button');
    this.filterIcon = page.locator('.filter-icon');
    this.orderCards = page.locator('.order-card');
  }

  getOrderNumber(index: number): Locator {
    return this.orderCards.nth(index).locator('.order-number');
  }

  getBusinessName(index: number): Locator {
    return this.orderCards.nth(index).locator('.business-name');
  }

  getStatusBadge(index: number): Locator {
    return this.orderCards.nth(index).locator('.status-badge');
  }

  getOrderDetail(index: number, label: string): Locator {
    return this.orderCards.nth(index).locator(`.detail-item:has(.detail-label:has-text("${label}")) .detail-value`);
  }

  getDescription(index: number): Locator {
    return this.orderCards.nth(index).locator('.description-text');
  }

  getPrice(index: number): Locator {
    return this.orderCards.nth(index).locator('.price-text');
  }

  getApproveButton(index: number): Locator {
    return this.orderCards.nth(index).locator('.approve-button');
  }

  getRejectButton(index: number): Locator {
    return this.orderCards.nth(index).locator('.reject-button');
  }

  getApproveIcon(index: number): Locator {
    return this.orderCards.nth(index).locator('.action-icon[src*="approve"]');
  }

  getRejectIcon(index: number): Locator {
    return this.orderCards.nth(index).locator('.action-icon[src*="reject"]');
  }

  getStatusDisplay(index: number): Locator {
    return this.orderCards.nth(index).locator('.status-display');
  }

  async navigate() {
    await this.page.goto('/admin/orders', { waitUntil: 'networkidle', timeout: 15000 });
    await expect(this.page.locator('.p-4')).toBeVisible({ timeout: 10000 });
  }
}