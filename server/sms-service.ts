/**
 * SMS Service Module
 * Handles SMS reminders using Twilio API
 * Sends offer expiration reminders 24 hours before deadline
 */

import axios from "axios";

interface SendSmsOptions {
  phoneNumber: string;
  message: string;
  countryCode?: string;
}

/**
 * Send SMS via Twilio
 * Requires TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER env vars
 */
export async function sendSms(options: SendSmsOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromPhone) {
    console.warn("[SMS] Twilio credentials not configured. SMS disabled.");
    return {
      success: false,
      error: "SMS service not configured",
    };
  }

  try {
    // Format phone number with country code
    const toPhone = options.countryCode
      ? `+${getCountryCode(options.countryCode)}${options.phoneNumber}`
      : `+63${options.phoneNumber}`;

    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      new URLSearchParams({
        From: fromPhone,
        To: toPhone,
        Body: options.message,
      }),
      {
        auth: {
          username: accountSid,
          password: authToken,
        },
      }
    );

    return {
      success: true,
      messageId: response.data.sid,
    };
  } catch (error) {
    console.error("[SMS] Failed to send SMS:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send SMS",
    };
  }
}

/**
 * Send offer expiration reminder
 */
export async function sendOfferExpirationReminder(
  phoneNumber: string,
  productName: string,
  discountCode: string,
  countryCode: string = "PH"
): Promise<{ success: boolean; messageId?: string }> {
  const message = `🔥 LAST CHANCE! Your ${productName} offer expires in 24 hours! Use code ${discountCode} for 20% off. Get it now: https://finfunnel-7wtjyhxe.manus.space`;

  const result = await sendSms({
    phoneNumber,
    message,
    countryCode,
  });

  return {
    success: result.success,
    messageId: result.messageId,
  };
}

/**
 * Get country code from country name
 */
function getCountryCode(countryCode: string): string {
  const countryCodes: Record<string, string> = {
    PH: "63", // Philippines
    US: "1", // United States
    CA: "1", // Canada
    AU: "61", // Australia
    GB: "44", // United Kingdom
    SG: "65", // Singapore
    MY: "60", // Malaysia
    TH: "66", // Thailand
    VN: "84", // Vietnam
    ID: "62", // Indonesia
  };

  return countryCodes[countryCode.toUpperCase()] || "63"; // Default to PH
}
