import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
    ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce
    .number()
    .positive()
    .max(65536, `port should be >= 0 and < 65536`)
    .default(3000),
    AUTH_BASE_URL: z.string().url(),
    AUTH_SECRET: z.string(),
    AUTH_CLIENT_ID: z.string(),
    AUTH_ISSUER_BASE_URL: z.string().url(),
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number().positive().max(65535).default(5432),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
})

export const config = envSchema.parse(process.env)
export type Config = z.infer<typeof envSchema>
