import type {Config} from 'drizzle-kit'
require('dotenv').config()

export default {
    driver: 'pg',
    schema: './lib/db/schema.ts',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    }, 
} satisfies Config

// run `npx drizzle-kit push:pg`

// to make sure that our db is synced up with neon db
