import "dotenv/config"
import { z } from "zod"

import { mapAndValidateSchema } from "@/lib/utils/zod"

const envSchema = z.object({
    ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce
        .number()
        .positive()
        .max(65536, `port should be >= 0 and < 65536`)
        .default(3000),
    auth: z.object({
        AUTH_BASE_URL: z.string().url(),
        AUTH_SECRET: z.string(),
        AUTH_CLIENT_ID: z.string(),
        AUTH_ISSUER_BASE_URL: z.string().url(),
    }),
    db: z.object({
        DB_HOST: z.string(),
        DB_PORT: z.coerce.number().positive().max(65535).default(5432),
        DB_USER: z.string(),
        DB_PASSWORD: z.string(),
        DB_NAME: z.string(),
    }),
})

export const config = mapAndValidateSchema(envSchema, process.env)
export type Config = typeof config
