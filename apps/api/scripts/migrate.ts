import {getDbConfig} from "../config/database.ts";
import pg from "pg";
import { fileURLToPath } from "node:url";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

// Workaround: drizzle-kit migrate exits with code 1 without reporting an error
// in our current setup. Use Drizzle's programmatic migrator instead.

const client = new pg.Client(getDbConfig());

try {
  await client.connect();

  const db = drizzle(client);

  console.log("Applying migrations...");

  await migrate(db, {
    migrationsFolder: fileURLToPath(new URL("../drizzle", import.meta.url)),
  });

  console.log("Migrations applied successfully.");
} catch (error) {
  console.error("Database migration failed:", error);
  process.exitCode = 1;
} finally {
  await client.end();
}
