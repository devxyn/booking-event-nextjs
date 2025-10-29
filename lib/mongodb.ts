import mongoose, { type ConnectOptions, type Mongoose } from "mongoose";

/**
 * Mongoose connection helper for Next.js (App Router & Pages).
 *
 * - Ensures a single MongoDB connection is reused across hot reloads in dev.
 * - Provides strong TypeScript typing (no `any`).
 * - Safe to call from any server-side code (route handlers, server actions, etc.).
 */

// Read the connection string from environment variables once at module load time.
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI.length === 0) {
  throw new Error("Missing MONGODB_URI environment variable. Please set it in your environment (e.g., .env.local).");
}

/**
 * A small cache stored on the Node.js global object so that the
 * connection is preserved across module reloads in development.
 */
type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

declare global {
  var __mongooseCache: MongooseCache | undefined;
}

// Initialize or reuse the global cache object.
const cached: MongooseCache = (global.__mongooseCache ??= {
  conn: null,
  promise: null,
});

/**
 * Establishes (or reuses) a MongoDB connection via Mongoose.
 *
 * Returns a resolved, ready-to-use Mongoose instance.
 */
export async function connectDB(): Promise<Mongoose> {
  // Reuse existing connection in dev or after the first call in prod.
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    // Connection options: tune as needed for your deployment topology.
    const options: ConnectOptions = {
      // Avoid mongoose buffering commands; surface connection errors immediately
      bufferCommands: false,
      // Connection pool sizing (adjust for your workload)
      maxPoolSize: 10,
      // Fail fast if server is not reachable
      serverSelectionTimeoutMS: 5000,
      // Keep sockets alive for reuse
      socketTimeoutMS: 45000,
    };

    // Create the connection once; subsequent callers await the same promise.
    const uri: string = MONGODB_URI as string; // Safe after the runtime guard above
    cached.promise = mongoose.connect(uri, options).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
