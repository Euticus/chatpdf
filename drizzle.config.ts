import type {Config} from 'drizzle-kit'
import * as dotenv from 'dotenv'
const path = require('path')
require('dotenv').config({ 
    path: path.resolve(__dirname, '../.env')
})

export default {
    driver: 'pg',
    schema: './src/lib/db/schema.ts',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!
    }, 
} satisfies Config

// run `npx drizzle-kit push:pg`

// to make sure that our db is synced up with neon db
