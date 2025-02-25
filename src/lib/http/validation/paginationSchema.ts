import { z } from "zod"

export const paginationSchema = z.object({
    page: z
        .string()
        .transform(Number)
        .refine((n) => Number.isInteger(n) && n > 0, {
            message: "Page must be a positive integer",
        })
        .default("1"),

    pageSize: z
        .string()
        .transform(Number)
        .refine((n) => [10, 20, 30].includes(n), {
            message: "PageSize must be one of 10, 20, 30",
        })
        .default("10"),
})
