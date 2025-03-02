import { Pool } from "pg"
import { config } from "@/lib/config"

const pool = new Pool({
    user: config.db.DB_USER,
    host: config.db.DB_HOST,
    database: config.db.DB_NAME,
    password: config.db.DB_PASSWORD,
    port: config.db.DB_PORT,
})


pool.on("connect", () => {
    console.log("PG connection successful")
})

export default pool
