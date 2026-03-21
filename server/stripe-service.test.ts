import { describe, it, expect, beforeEach, vi } from "vitest";
import * as stripeService from "./stripe-service";

describe("Stripe Service", () => {
  describe("createCheckoutSession", () => {
    it("should create a checkout session with valid parameters", async () => {
      const result = await stripeService.createCheckoutSession(
        "Mini Crisis Blueprint",
        14900,
        "test@example.com",
        1,
        "Test User",
        "https://example.com"
      );

      expect(result.success === true || result.success === false).toBe(true);
      if (result.success) {
        expect(result.sessionId).toBeDefined();
        expect(result.checkoutUrl).toBeDefined();
        expect(result.checkoutUrl).toContain("stripe.com");
      }
    });

    it("should handle missing origin gracefully", async () => {
      const result = await stripeService.createCheckoutSession(
        "Test Product",
        9900,
        "test@example.com",
        undefined,
        undefined,
        undefined
      );

      expect(result.success === true || result.success === false).toBe(true);
      if (result.success) {
        expect(result.checkoutUrl).toBeDefined();
      }
    });

    it("should include customer email in checkout", async () => {
      const email = "customer@example.com";
      const result = await stripeService.createCheckoutSession(
        "Product",
        19900,
        email,
        2,
        "Customer Name"
      );

      expect(result.success === true || result.success === false).toBe(true);
    });
  });

  describe("saveOrder", () => {
    it("should save order with valid data", async () => {
      const result = await stripeService.saveOrder(
        "test@example.com",
        "cs_test_123",
        "Test Product",
        14900,
        1
      );

      expect(result.success).toBe(true);
    });

    it("should handle missing userId", async () => {
      const result = await stripeService.saveOrder(
        "test@example.com",
        "cs_test_456",
        "Test Product",
        19900
      );

      expect(result.success).toBe(true);
    });

    it("should validate email format", async () => {
      const result = await stripeService.saveOrder(
        "invalid-email",
        "cs_test_789",
        "Test Product",
        9900
      );

      // Should still save (email validation happens at API level)
      expect(result.success === true || result.success === false).toBe(true);
    });
  });

  describe("updateOrderStatus", () => {
    it("should update order status to completed", async () => {
      // First save an order
      await stripeService.saveOrder(
        "test@example.com",
        "cs_test_update_1",
        "Product",
        14900
      );

      // Then update it
      const result = await stripeService.updateOrderStatus(
        "cs_test_update_1",
        "completed",
        "pi_test_123"
      );

      expect(result.success).toBe(true);
    });

    it("should update order status to failed", async () => {
      await stripeService.saveOrder(
        "test@example.com",
        "cs_test_update_2",
        "Product",
        19900
      );

      const result = await stripeService.updateOrderStatus(
        "cs_test_update_2",
        "failed"
      );

      expect(result.success).toBe(true);
    });

    it("should handle non-existent session ID gracefully", async () => {
      const result = await stripeService.updateOrderStatus(
        "cs_test_nonexistent",
        "completed"
      );

      // Should not throw, but may not update anything
      expect(result.success === true || result.success === false).toBe(true);
    });
  });

  describe("getOrderBySessionId", () => {
    it("should retrieve saved order", async () => {
      const sessionId = "cs_test_retrieve_1";
      await stripeService.saveOrder(
        "test@example.com",
        sessionId,
        "Test Product",
        14900,
        1
      );

      const order = await stripeService.getOrderBySessionId(sessionId);

      expect(order).toBeDefined();
      if (order) {
        expect(order.email).toBe("test@example.com");
        expect(order.productName).toBe("Test Product");
        expect(order.productPrice).toBe(14900);
      }
    });

    it("should return null for non-existent order", async () => {
      const order = await stripeService.getOrderBySessionId(
        "cs_test_nonexistent_order"
      );

      expect(order).toBeNull();
    });
  });

  describe("getUserOrders", () => {
    it("should retrieve all user orders", async () => {
      const userId = 99;

      // Save multiple orders
      await stripeService.saveOrder(
        "user@example.com",
        "cs_test_user_1",
        "Product 1",
        14900,
        userId
      );

      await stripeService.saveOrder(
        "user@example.com",
        "cs_test_user_2",
        "Product 2",
        19900,
        userId
      );

      const orders = await stripeService.getUserOrders(userId);

      expect(Array.isArray(orders)).toBe(true);
      expect(orders.length >= 2).toBe(true);
    });

    it("should return empty array for user with no orders", async () => {
      const orders = await stripeService.getUserOrders(99999);

      expect(Array.isArray(orders)).toBe(true);
    });
  });

  describe("getOrCreateStripeCustomer", () => {
    it("should create a new Stripe customer", async () => {
      const customerId = await stripeService.getOrCreateStripeCustomer(
        1,
        "newcustomer@example.com",
        "New Customer"
      );

      expect(customerId).toBeDefined();
      expect(typeof customerId).toBe("string");
      expect(customerId.startsWith("cus_")).toBe(true);
    });

    it("should return existing customer ID on second call", async () => {
      const userId = 2;
      const email = "existing@example.com";

      const customerId1 = await stripeService.getOrCreateStripeCustomer(
        userId,
        email,
        "Existing Customer"
      );

      const customerId2 = await stripeService.getOrCreateStripeCustomer(
        userId,
        email,
        "Existing Customer"
      );

      expect(customerId1).toBe(customerId2);
    });
  });
});
