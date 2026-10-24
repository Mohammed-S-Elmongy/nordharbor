import { defineConfig } from "drizzle-kit";
import { getDbConfig } from "./src/config/database.ts";
import { loadEnvFile } from "node:process";

loadEnvFile(new URL("../../.env", import.meta.url));

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: getDbConfig(),
});
