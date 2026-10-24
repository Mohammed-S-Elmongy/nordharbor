import { loadEnvFile } from "node:process";

loadEnvFile(new URL("../../../../.env", import.meta.url));

function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is missing from this environment`);
  }
  return value;
}

// Number() can return NaN, which is still a JavaScript number.
// Ensure the port is a valid integer between 1 and 65535.
function getDbPort(): number {
  const port = Number(process.env.DB_PORT ?? "5432");
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`DB_PORT is invalid: ${port}`);
  }
  return port;
}

export function getDbConfig(): {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
} {
  return {
    host: process.env.DB_HOST ?? "localhost",
    port: getDbPort(),
    user: requireEnvVar("DB_USER"),
    password: requireEnvVar("DB_PASSWORD"),
    database: requireEnvVar("DB_NAME"),
  };
}
