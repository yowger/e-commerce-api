import { Kysely, PostgresDialect } from "kysely"
import { Pool } from "pg"

import { config } from "@/lib/config"
import { Database } from "@/lib/db/types"

const dialect = new PostgresDialect({
    pool: new Pool({
        user: config.db.DB_USER,
        host: config.db.DB_HOST,
        database: config.db.DB_NAME,
        password: config.db.DB_PASSWORD,
        port: config.db.DB_PORT,
    }),
})

export const db = new Kysely<Database>({
    dialect,
})
