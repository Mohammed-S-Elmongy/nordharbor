import { defineConfig } from "drizzle-kit";
import { getDbConfig } from "./config/database.js";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: getDbConfig(),
});
