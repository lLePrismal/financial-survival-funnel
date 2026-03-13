import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, emailSubscribers, InsertEmailSubscriber } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Subscribe an email to the mailing list
 * Returns a download token for accessing the lead magnet
 */
export async function subscribeEmail(
  email: string,
  source: string = "free-offer"
): Promise<{ downloadToken: string; isNewSubscriber: boolean }> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    // Generate a unique download token
    const downloadToken = generateDownloadToken();

    const values: InsertEmailSubscriber = {
      email: email.toLowerCase().trim(),
      source,
      status: "subscribed",
      downloadToken,
    };

    // Try to insert, or update if email already exists
    await db
      .insert(emailSubscribers)
      .values(values)
      .onDuplicateKeyUpdate({
        set: {
          status: "subscribed",
          downloadToken,
          updatedAt: new Date(),
        },
      });

    return {
      downloadToken,
      isNewSubscriber: true,
    };
  } catch (error) {
    console.error("[Database] Failed to subscribe email:", error);
    throw error;
  }
}

/**
 * Mark an email as downloaded
 */
export async function markEmailAsDownloaded(downloadToken: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db
      .update(emailSubscribers)
      .set({
        downloadedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(emailSubscribers.downloadToken, downloadToken));
  } catch (error) {
    console.error("[Database] Failed to mark email as downloaded:", error);
    throw error;
  }
}

/**
 * Get subscriber by email
 */
export async function getSubscriberByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get subscriber: database not available");
    return undefined;
  }

  try {
    const result = await db
      .select()
      .from(emailSubscribers)
      .where(eq(emailSubscribers.email, email.toLowerCase().trim()))
      .limit(1);

    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get subscriber:", error);
    return undefined;
  }
}

/**
 * Generate a unique download token
 */
function generateDownloadToken(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Date.now().toString(36);
}
