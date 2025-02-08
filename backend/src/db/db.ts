import postgres from "postgres"
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './migration';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const client = postgres(DATABASE_URL)
export const db = drizzle({ client, schema })

