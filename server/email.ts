import { ENV } from "./_core/env";

/**
 * Email Service
 * Sends automated emails using Manus built-in email API
 */

interface EmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

/**
 * Send an email using Manus built-in email service
 */
export async function sendEmail(options: EmailOptions): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  try {
    const response = await fetch(`${ENV.forgeApiUrl}/email/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.forgeApiKey}`,
      },
      body: JSON.stringify({
        to: options.to,
        subject: options.subject,
        htmlContent: options.htmlContent,
        textContent: options.textContent || stripHtml(options.htmlContent),
        from: "noreply@finfunnel.manus.space",
        replyTo: "support@finfunnel.manus.space",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[Email] Failed to send email:", error);
      return {
        success: false,
        error: "Failed to send email",
      };
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    console.error("[Email] Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send the PDF guide to a subscriber
 */
export async function sendPdfGuide(
  email: string,
  downloadToken: string,
  pdfUrl: string
): Promise<{
  success: boolean;
  error?: string;
}> {
  const downloadLink = `${process.env.VITE_APP_URL || "https://finfunnel-7wtjyhxe.manus.space"}/download/${downloadToken}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #FF4444; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .cta-button { display: inline-block; background-color: #FCD34D; color: #000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          .benefit-list { margin: 15px 0; }
          .benefit-list li { margin: 8px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Your Emergency Survival Formula is Ready!</h1>
          </div>

          <div class="content">
            <p>Hi there,</p>
            
            <p>Thank you for subscribing! Your <strong>5-Page Emergency Survival Formula</strong> guide is ready to download.</p>

            <p>Inside this guide, you'll discover:</p>
            <ul class="benefit-list">
              <li>✓ 3-Level Crisis Budget Framework</li>
              <li>✓ What to Cut in 24 Hours (and Save ₱7,000-19,000/month)</li>
              <li>✓ What to Protect First (Your Income Safety Net)</li>
              <li>✓ Survival Days Computation Formula</li>
              <li>✓ Real Examples You Can Use Today</li>
            </ul>

            <p><strong>This is the foundation of the complete 15-page Mini Crisis Survival Blueprint (₱149).</strong> Use this free guide to see if the full system is right for you.</p>

            <center>
              <a href="${downloadLink}" class="cta-button">📥 Download Your Guide Now</a>
            </center>

            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              <strong>Can't click the button?</strong> Copy and paste this link in your browser:<br>
              <code>${downloadLink}</code>
            </p>

            <p style="margin-top: 20px; font-size: 14px;">
              Once you download and read the guide, you'll understand exactly how long you can survive without income. 
              Then you can decide if the full system is worth exploring.
            </p>

            <p style="margin-top: 20px;">
              Questions? Reply to this email—we read every message.
            </p>

            <p>
              To your financial security,<br>
              <strong>The Financial Survival Team</strong>
            </p>
          </div>

          <div class="footer">
            <p>You received this email because you subscribed to our free guide.</p>
            <p><a href="${process.env.VITE_APP_URL || "https://finfunnel-7wtjyhxe.manus.space"}/unsubscribe/${downloadToken}" style="color: #666;">Unsubscribe</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
Your Emergency Survival Formula is Ready!

Thank you for subscribing! Your 5-Page Emergency Survival Formula guide is ready to download.

Inside this guide, you'll discover:
- 3-Level Crisis Budget Framework
- What to Cut in 24 Hours
- What to Protect First
- Survival Days Computation Formula
- Real Examples You Can Use Today

Download your guide: ${downloadLink}

Questions? Reply to this email.

To your financial security,
The Financial Survival Team
  `;

  return sendEmail({
    to: email,
    subject: "🎉 Your Emergency Survival Formula Guide is Ready!",
    htmlContent,
    textContent,
  });
}

/**
 * Send a welcome email to new subscribers
 */
export async function sendWelcomeEmail(email: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #06B6D4; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background-color: #f9f9f9; padding: 20px; border-radius: 8px; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Financial Survival!</h1>
          </div>

          <div class="content">
            <p>Hi there,</p>
            
            <p>Welcome to our community! We're glad you're taking the first step toward financial security.</p>

            <p>Your guide is being prepared and will be sent to you shortly. In the meantime, here's what you should know:</p>

            <p><strong>This guide is for you if:</strong></p>
            <ul>
              <li>You're a call center agent, OFW, breadwinner, VA, or side hustler</li>
              <li>You worry about what happens if your income stops</li>
              <li>You want a practical system, not motivation</li>
              <li>You're ready to take action today</li>
            </ul>

            <p>Check your inbox for the download link. If you don't see it in a few minutes, check your spam folder.</p>

            <p>
              To your financial security,<br>
              <strong>The Financial Survival Team</strong>
            </p>
          </div>

          <div class="footer">
            <p>You received this email because you subscribed to our free guide.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: "Welcome to Financial Survival! 🎯",
    htmlContent,
  });
}

/**
 * Strip HTML tags from a string
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}
