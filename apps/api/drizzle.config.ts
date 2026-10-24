import { defineConfig } from "drizzle-kit";
import { getDbConfig } from "./src/config/database.ts";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: getDbConfig(),
});
