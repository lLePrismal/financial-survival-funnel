import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { subscribeEmail } from "./db";
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
});

export type AppRouter = typeof appRouter;
