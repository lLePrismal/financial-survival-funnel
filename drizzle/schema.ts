import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Email subscribers table for lead magnet capture.
 * Stores emails from Free Offer page to build mailing list.
 */
export const emailSubscribers = mysqlTable("emailSubscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  source: varchar("source", { length: 64 }).default("free-offer").notNull(),
  status: mysqlEnum("status", ["subscribed", "unsubscribed", "bounced"]).default("subscribed").notNull(),
  downloadToken: varchar("downloadToken", { length: 128 }),
  downloadedAt: timestamp("downloadedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailSubscriber = typeof emailSubscribers.$inferSelect;
export type InsertEmailSubscriber = typeof emailSubscribers.$inferInsert;
/**
 * Stripe customers table for payment processing.
 * Stores Stripe customer IDs linked to users.
 */
export const stripeCustomers = mysqlTable("stripeCustomers", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StripeCustomer = typeof stripeCustomers.$inferSelect;
export type InsertStripeCustomer = typeof stripeCustomers.$inferInsert;

/**
 * Stripe orders table for tracking purchases.
 * Stores minimal data - Stripe is the source of truth.
 */
export const stripeOrders = mysqlTable("stripeOrders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  email: varchar("email", { length: 320 }).notNull(),
  stripeCheckoutSessionId: varchar("stripeCheckoutSessionId", { length: 255 }).notNull().unique(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  productName: varchar("productName", { length: 255 }).notNull(),
  productPrice: int("productPrice").notNull(), // Amount in cents
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type StripeOrder = typeof stripeOrders.$inferSelect;
export type InsertStripeOrder = typeof stripeOrders.$inferInsert;

/**
 * Affiliates table for affiliate program.
 * Tracks affiliate partners and their commission rates.
 */
export const affiliates = mysqlTable("affiliates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  affiliateCode: varchar("affiliateCode", { length: 64 }).notNull().unique(),
  referralLink: varchar("referralLink", { length: 512 }).notNull(),
  commissionRate: int("commissionRate").default(20).notNull(), // Percentage (e.g., 20 = 20%)
  totalCommission: int("totalCommission").default(0).notNull(), // Amount in cents
  totalReferrals: int("totalReferrals").default(0).notNull(),
  status: mysqlEnum("status", ["active", "inactive", "suspended"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Affiliate = typeof affiliates.$inferSelect;
export type InsertAffiliate = typeof affiliates.$inferInsert;

/**
 * Referrals table for tracking affiliate referrals.
 * Links orders to affiliate referrals for commission calculation.
 */
export const referrals = mysqlTable("referrals", {
  id: int("id").autoincrement().primaryKey(),
  affiliateId: int("affiliateId").notNull(),
  orderId: int("orderId").notNull(),
  commissionAmount: int("commissionAmount").notNull(), // Amount in cents
  status: mysqlEnum("status", ["pending", "completed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = typeof referrals.$inferInsert;

/**
 * SMS subscribers table for SMS reminders.
 * Stores phone numbers for SMS reminder system.
 */
export const smsSubscribers = mysqlTable("smsSubscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull(),
  countryCode: varchar("countryCode", { length: 3 }).default("PH").notNull(),
  status: mysqlEnum("status", ["subscribed", "unsubscribed", "bounced"]).default("subscribed").notNull(),
  lastReminderSent: timestamp("lastReminderSent"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SmsSubscriber = typeof smsSubscribers.$inferSelect;
export type InsertSmsSubscriber = typeof smsSubscribers.$inferInsert;
