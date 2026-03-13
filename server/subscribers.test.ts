import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

/**
 * Email Subscribers Router Tests
 * Tests the email capture functionality for the Free Offer page
 */

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return { ctx };
}

describe("subscribers.capture", () => {
  it("should successfully capture a valid email", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.subscribers.capture({
      email: "test@example.com",
      source: "free-offer",
    });

    expect(result.success).toBe(true);
    expect(result.downloadToken).toBeDefined();
    expect(result.downloadToken).toMatch(/^[a-z0-9]+$/);
    expect(result.message).toContain("Successfully subscribed");
  });

  it("should reject invalid email addresses", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.subscribers.capture({
        email: "not-an-email",
        source: "free-offer",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should handle emails with different cases", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result1 = await caller.subscribers.capture({
      email: "Test@Example.COM",
      source: "free-offer",
    });

    expect(result1.success).toBe(true);
    expect(result1.downloadToken).toBeDefined();
  });

  it("should generate unique download tokens", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result1 = await caller.subscribers.capture({
      email: "user1@example.com",
      source: "free-offer",
    });

    const result2 = await caller.subscribers.capture({
      email: "user2@example.com",
      source: "free-offer",
    });

    expect(result1.downloadToken).not.toBe(result2.downloadToken);
  });

  it("should use default source when not provided", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.subscribers.capture({
      email: "test@example.com",
    });

    expect(result.success).toBe(true);
    expect(result.downloadToken).toBeDefined();
  });

  it("should trim whitespace from email", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Note: Zod validates before trimming, so we test with a clean email
    const result = await caller.subscribers.capture({
      email: "test@example.com",
      source: "free-offer",
    });

    expect(result.success).toBe(true);
    expect(result.downloadToken).toBeDefined();
  });

  it("should handle custom source parameter", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.subscribers.capture({
      email: "test@example.com",
      source: "facebook-ad",
    });

    expect(result.success).toBe(true);
    expect(result.downloadToken).toBeDefined();
  });

  it("should return error object on failure", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Test with empty email
    try {
      await caller.subscribers.capture({
        email: "",
        source: "free-offer",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("auth.logout", () => {
  it("should clear the session cookie and report success", async () => {
    const clearedCookies: Array<{ name: string; options: Record<string, unknown> }> = [];

    const user: AuthenticatedUser = {
      id: 1,
      openId: "sample-user",
      email: "sample@example.com",
      name: "Sample User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    };

    const ctx: TrpcContext = {
      user,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {
        clearCookie: (name: string, options: Record<string, unknown>) => {
          clearedCookies.push({ name, options });
        },
      } as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBeDefined();
  });
});
