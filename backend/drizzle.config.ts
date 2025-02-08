import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/migrations',
  schema: './src/db/migration.ts',
  dialect: 'postgresql',
});
