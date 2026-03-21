import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { subscribeEmail } from "./db";
import { sendPdfGuide } from "./email";
import { createCheckoutSession, saveOrder } from "./stripe-service";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  subscribers: router({
    capture: publicProcedure
      .input(
        z.object({
          email: z.string().email("Invalid email address"),
          source: z.string().default("free-offer"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const { downloadToken } = await subscribeEmail(input.email, input.source);
          
          // Send PDF guide email asynchronously (don't wait for it)
          const pdfUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663178774865/7wTJyHXEYJUZwAQXqkbzVh/financial-survival-guide_5fe9cbf8.pdf";
          sendPdfGuide(input.email, downloadToken, pdfUrl).catch((error) => {
            console.error("[Email] Failed to send PDF guide:", error);
          });
          
          return {
            success: true,
            downloadToken,
            message: "Successfully subscribed! Check your email for the download link.",
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Failed to subscribe";
          return {
            success: false,
            error: errorMessage,
          };
        }
      }),
  }),

  payment: router({
    createCheckout: publicProcedure
      .input(
        z.object({
          productId: z.string(),
          productName: z.string(),
          productPrice: z.number().positive(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        try {
          const email = ctx.user?.email || "guest@example.com";
          const userName = ctx.user?.name;
          const userId = ctx.user?.id;
          const origin = ctx.req.headers.origin as string | null | undefined;

          // Create Stripe checkout session
          const { sessionId, checkoutUrl } = await createCheckoutSession(
            input.productName,
            input.productPrice,
            email,
            userId,
            userName,
            origin
          );

          // Save order to database
          await saveOrder(email, sessionId, input.productName, input.productPrice, userId);

          return {
            success: true,
            checkoutUrl,
            sessionId,
          };
        } catch (error) {
          console.error("[Payment] Failed to create checkout:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create checkout",
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
