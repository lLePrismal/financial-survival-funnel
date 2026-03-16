import { describe, expect, it, vi, beforeEach } from "vitest";
import { sendEmail, sendPdfGuide } from "./email";

/**
 * Email Service Tests
 * Tests the email sending functionality
 */

// Mock fetch globally
global.fetch = vi.fn();

describe("Email Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("sendEmail", () => {
    it("should successfully send an email", async () => {
      const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messageId: "msg-123" }),
      });

      const result = await sendEmail({
        to: "test@example.com",
        subject: "Test Email",
        htmlContent: "<p>Test content</p>",
      });

      expect(result.success).toBe(true);
      expect(result.messageId).toBe("msg-123");
      expect(mockFetch).toHaveBeenCalledOnce();
    });

    it("should handle email sending errors", async () => {
      const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
      mockFetch.mockResolvedValueOnce({
        ok: false,
        text: async () => "Email service error",
      });

      const result = await sendEmail({
        to: "test@example.com",
        subject: "Test Email",
        htmlContent: "<p>Test content</p>",
      });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should include proper headers in request", async () => {
      const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messageId: "msg-123" }),
      });

      await sendEmail({
        to: "test@example.com",
        subject: "Test Email",
        htmlContent: "<p>Test content</p>",
      });

      const callArgs = mockFetch.mock.calls[0];
      const options = callArgs[1] as Record<string, unknown>;
      
      expect(options.method).toBe("POST");
      expect(options.headers).toHaveProperty("Content-Type", "application/json");
      expect(options.headers).toHaveProperty("Authorization");
    });

    it("should strip HTML from text content", async () => {
      const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messageId: "msg-123" }),
      });

      await sendEmail({
        to: "test@example.com",
        subject: "Test Email",
        htmlContent: "<p>Test <strong>content</strong></p>",
        textContent: "Custom text",
      });

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse((callArgs[1] as Record<string, unknown>).body as string);
      
      expect(body.textContent).toBe("Custom text");
    });
  });

  describe("sendPdfGuide", () => {
    it("should send PDF guide email with correct content", async () => {
      const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messageId: "msg-456" }),
      });

      const result = await sendPdfGuide(
        "user@example.com",
        "token-123",
        "https://example.com/guide.pdf"
      );

      expect(result.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledOnce();

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse((callArgs[1] as Record<string, unknown>).body as string);
      
      expect(body.to).toBe("user@example.com");
      expect(body.subject).toContain("Emergency Survival Formula");
      expect(body.htmlContent).toContain("download");
    });

    it("should include download link in email", async () => {
      const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messageId: "msg-456" }),
      });

      await sendPdfGuide(
        "user@example.com",
        "token-123",
        "https://example.com/guide.pdf"
      );

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse((callArgs[1] as Record<string, unknown>).body as string);
      
      expect(body.htmlContent).toContain("/download/token-123");
    });

    it("should handle PDF guide sending errors", async () => {
      const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
      mockFetch.mockResolvedValueOnce({
        ok: false,
        text: async () => "Service error",
      });

      const result = await sendPdfGuide(
        "user@example.com",
        "token-123",
        "https://example.com/guide.pdf"
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should include benefits list in email", async () => {
      const mockFetch = global.fetch as ReturnType<typeof vi.fn>;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messageId: "msg-456" }),
      });

      await sendPdfGuide(
        "user@example.com",
        "token-123",
        "https://example.com/guide.pdf"
      );

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse((callArgs[1] as Record<string, unknown>).body as string);
      
      expect(body.htmlContent).toContain("3-Level Crisis Budget");
      expect(body.htmlContent).toContain("What to Cut in 24 Hours");
      expect(body.htmlContent).toContain("Survival Days");
    });
  });
});
