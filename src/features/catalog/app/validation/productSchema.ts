import { z } from "zod"

export const ProductIdSchema = z.object({
    id: z.string(),
})

export const ProductBaseSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(100, { message: "Name must not exceed 100 characters" })
        .trim(),

    description: z
        .string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(500, { message: "Description must not exceed 500 characters" })
        .trim(),

    price: z
        .number()
        .positive({ message: "Price must be a positive number" })
        .multipleOf(0.01, {
            message: "Price must have at most two decimal places",
        }),

    categoryId: z.string(),
})

export const CreateProductSchema = ProductBaseSchema

export const UpdateProductSchema = ProductBaseSchema.partial()
