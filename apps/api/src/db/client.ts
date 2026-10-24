import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { getDbConfig } from "../config/database.ts";
import * as schema from "./schema.ts";

const pool = new pg.Pool(getDbConfig());
export const db = drizzle(pool, { schema });
