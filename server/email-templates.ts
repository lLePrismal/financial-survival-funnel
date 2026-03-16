/**
 * Email Templates
 * Centralized email template configurations for easy customization
 */

export const emailTemplates = {
  /**
   * PDF Guide Delivery Email
   * Sent when user confirms their email to receive the free guide
   */
  pdfGuideDelivery: {
    subject: "🎉 Your Emergency Survival Formula Guide is Ready!",
    preheader: "Download your 5-page guide to financial security",
    
    getHtml: (email: string, downloadLink: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6; 
              color: #333; 
              background-color: #f5f5f5;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
            }
            .email-wrapper {
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #FF4444 0%, #FF6B6B 100%);
              color: white; 
              padding: 30px 20px; 
              text-align: center;
            }
            .header h1 { 
              margin: 0; 
              font-size: 28px;
              font-weight: bold;
            }
            .header p {
              margin: 8px 0 0 0;
              font-size: 14px;
              opacity: 0.95;
            }
            .content { 
              padding: 30px 20px;
            }
            .greeting {
              font-size: 16px;
              margin-bottom: 20px;
            }
            .intro-text {
              font-size: 15px;
              color: #555;
              margin-bottom: 20px;
              line-height: 1.8;
            }
            .benefits-section {
              background-color: #f9f9f9;
              border-left: 4px solid #FCD34D;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .benefits-section h3 {
              margin-top: 0;
              color: #FF4444;
              font-size: 16px;
            }
            .benefit-list { 
              margin: 10px 0;
              padding-left: 20px;
            }
            .benefit-list li { 
              margin: 8px 0;
              font-size: 14px;
              color: #555;
            }
            .cta-section {
              text-align: center;
              margin: 30px 0;
            }
            .cta-button { 
              display: inline-block;
              background: linear-gradient(135deg, #FCD34D 0%, #FBB040 100%);
              color: #000;
              padding: 14px 32px;
              border-radius: 6px;
              text-decoration: none;
              font-weight: bold;
              font-size: 16px;
              transition: transform 0.2s;
              box-shadow: 0 4px 12px rgba(252, 211, 77, 0.3);
            }
            .cta-button:hover {
              transform: translateY(-2px);
            }
            .fallback-link {
              margin-top: 15px;
              font-size: 12px;
              color: #999;
            }
            .fallback-link code {
              background-color: #f0f0f0;
              padding: 2px 6px;
              border-radius: 3px;
              word-break: break-all;
              font-size: 11px;
            }
            .value-proposition {
              background-color: #f0f8ff;
              border: 1px solid #06B6D4;
              padding: 15px;
              border-radius: 4px;
              margin: 20px 0;
              font-size: 14px;
              color: #333;
            }
            .value-proposition strong {
              color: #06B6D4;
            }
            .footer-section {
              border-top: 1px solid #eee;
              padding-top: 20px;
              margin-top: 20px;
              font-size: 13px;
              color: #999;
            }
            .footer-links {
              text-align: center;
              margin-top: 15px;
            }
            .footer-links a {
              color: #FF4444;
              text-decoration: none;
              margin: 0 10px;
            }
            .signature {
              margin-top: 20px;
              font-size: 14px;
              color: #555;
            }
            .signature strong {
              color: #FF4444;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-wrapper">
              <div class="header">
                <h1>🎉 Your Guide is Ready!</h1>
                <p>Download your Emergency Survival Formula</p>
              </div>

              <div class="content">
                <p class="greeting">Hi there,</p>
                
                <p class="intro-text">
                  Thank you for subscribing! Your <strong>5-Page Emergency Survival Formula</strong> guide is ready to download.
                </p>

                <div class="benefits-section">
                  <h3>📚 Inside This Guide:</h3>
                  <ul class="benefit-list">
                    <li>✓ <strong>3-Level Crisis Budget Framework</strong> - Know exactly what to cut</li>
                    <li>✓ <strong>What to Cut in 24 Hours</strong> - Save ₱7,000-19,000/month</li>
                    <li>✓ <strong>What to Protect First</strong> - Your income safety net</li>
                    <li>✓ <strong>Survival Days Formula</strong> - Calculate your exact runway</li>
                    <li>✓ <strong>Real Examples</strong> - You can use today</li>
                  </ul>
                </div>

                <div class="value-proposition">
                  <strong>💡 This is the foundation</strong> of the complete 15-page Mini Crisis Survival Blueprint (₱149). 
                  Use this free guide to see if the full system is right for you.
                </div>

                <div class="cta-section">
                  <a href="${downloadLink}" class="cta-button">📥 Download Your Guide Now</a>
                  
                  <div class="fallback-link">
                    Can't click the button? Copy and paste this link:<br>
                    <code>${downloadLink}</code>
                  </div>
                </div>

                <p style="font-size: 14px; color: #666; margin-top: 25px;">
                  Once you download and read the guide, you'll understand exactly how long you can survive without income. 
                  Then you can decide if the full system is worth exploring.
                </p>

                <p style="font-size: 14px; color: #666;">
                  <strong>Questions?</strong> Reply to this email—we read every message.
                </p>

                <div class="signature">
                  To your financial security,<br>
                  <strong>The Financial Survival Team</strong>
                </div>

                <div class="footer-section">
                  <p style="margin: 0; text-align: center;">
                    You received this email because you subscribed to our free guide.
                  </p>
                  <div class="footer-links">
                    <a href="#">Unsubscribe</a> | <a href="#">Privacy Policy</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,

    getText: (downloadLink: string) => `
Your Emergency Survival Formula is Ready!

Thank you for subscribing! Your 5-Page Emergency Survival Formula guide is ready to download.

INSIDE THIS GUIDE:
✓ 3-Level Crisis Budget Framework
✓ What to Cut in 24 Hours (Save ₱7,000-19,000/month)
✓ What to Protect First (Your income safety net)
✓ Survival Days Formula (Calculate your exact runway)
✓ Real Examples (You can use today)

This is the foundation of the complete 15-page Mini Crisis Survival Blueprint (₱149).

DOWNLOAD YOUR GUIDE:
${downloadLink}

Once you download and read the guide, you'll understand exactly how long you can survive without income. Then you can decide if the full system is worth exploring.

Questions? Reply to this email—we read every message.

To your financial security,
The Financial Survival Team

---
You received this email because you subscribed to our free guide.
    `,
  },

  /**
   * Welcome Email
   * Sent immediately after subscription
   */
  welcome: {
    subject: "Welcome to Financial Survival! 🎯",
    preheader: "Your guide is being prepared",

    getHtml: (email: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6; 
              color: #333; 
              background-color: #f5f5f5;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
            }
            .email-wrapper {
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%);
              color: white; 
              padding: 30px 20px; 
              text-align: center;
            }
            .header h1 { 
              margin: 0; 
              font-size: 28px;
              font-weight: bold;
            }
            .content { 
              padding: 30px 20px;
            }
            .checklist {
              background-color: #f9f9f9;
              border-left: 4px solid #06B6D4;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .checklist h3 {
              margin-top: 0;
              color: #06B6D4;
            }
            .checklist li {
              margin: 8px 0;
              font-size: 14px;
            }
            .footer-section {
              border-top: 1px solid #eee;
              padding-top: 20px;
              margin-top: 20px;
              font-size: 13px;
              color: #999;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-wrapper">
              <div class="header">
                <h1>Welcome! 🎯</h1>
              </div>

              <div class="content">
                <p>Hi there,</p>
                
                <p>Welcome to our community! We're glad you're taking the first step toward financial security.</p>

                <p>Your guide is being prepared and will be sent to you shortly. In the meantime, here's what you should know:</p>

                <div class="checklist">
                  <h3>This guide is for you if:</h3>
                  <ul>
                    <li>✓ You're a call center agent, OFW, breadwinner, VA, or side hustler</li>
                    <li>✓ You worry about what happens if your income stops</li>
                    <li>✓ You want a practical system, not motivation</li>
                    <li>✓ You're ready to take action today</li>
                  </ul>
                </div>

                <p>Check your inbox for the download link. If you don't see it in a few minutes, check your spam folder.</p>

                <p>
                  To your financial security,<br>
                  <strong>The Financial Survival Team</strong>
                </p>

                <div class="footer-section">
                  <p>You received this email because you subscribed to our free guide.</p>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  },
};
