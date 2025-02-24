import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"
import { Product } from "@/features/catalog/domain/entities/Product"
import { NotFoundError } from "@/shared/errors/NotFoundError "

import type { PaginatedResult } from "@/shared/types/pagination"

export class InMemoryProductRepository implements ProductRepository {
    // private products: Map<string, Product> = new Map()
    private products: Map<string, Product> = new Map(
        [
            {
                id: "1",
                name: "Laptop",
                description: "High-performance laptop",
                price: 1200,
                categoryId: "electronics",
                createdAt: new Date("2024-01-01T10:00:00Z"),
                updatedAt: new Date("2024-02-01T10:00:00Z"),
            },
            {
                id: "2",
                name: "Smartphone",
                description: "Latest model smartphone",
                price: 800,
                categoryId: "electronics",
                createdAt: new Date("2024-01-05T12:00:00Z"),
                updatedAt: new Date("2024-02-05T12:00:00Z"),
            },
            {
                id: "3",
                name: "Headphones",
                description: "Noise-canceling headphones",
                price: 150,
                categoryId: "electronics",
                createdAt: new Date("2024-01-10T14:00:00Z"),
                updatedAt: new Date("2024-02-10T14:00:00Z"),
            },
            {
                id: "4",
                name: "Backpack",
                description: "Waterproof travel backpack",
                price: 60,
                categoryId: "accessories",
                createdAt: new Date("2024-01-15T16:00:00Z"),
                updatedAt: new Date("2024-02-15T16:00:00Z"),
            },
            {
                id: "5",
                name: "Gaming Mouse",
                description: "RGB gaming mouse",
                price: 50,
                categoryId: "electronics",
                createdAt: new Date("2024-01-20T18:00:00Z"),
                updatedAt: new Date("2024-02-20T18:00:00Z"),
            },
            {
                id: "6",
                name: "Desk Chair",
                description: "Ergonomic office chair",
                price: 200,
                categoryId: "furniture",
                createdAt: new Date("2024-01-25T20:00:00Z"),
                updatedAt: new Date("2024-02-25T20:00:00Z"),
            },
            {
                id: "7",
                name: "Mechanical Keyboard",
                description: "High-quality mechanical keyboard",
                price: 100,
                categoryId: "electronics",
                createdAt: new Date("2024-02-01T08:00:00Z"),
                updatedAt: new Date("2024-03-01T08:00:00Z"),
            },
            {
                id: "8",
                name: "Monitor",
                description: "4K ultra-wide monitor",
                price: 500,
                categoryId: "electronics",
                createdAt: new Date("2024-02-05T09:00:00Z"),
                updatedAt: new Date("2024-03-05T09:00:00Z"),
            },
            {
                id: "9",
                name: "Running Shoes",
                description: "Comfortable sports shoes",
                price: 90,
                categoryId: "fashion",
                createdAt: new Date("2024-02-10T11:00:00Z"),
                updatedAt: new Date("2024-03-10T11:00:00Z"),
            },
            {
                id: "10",
                name: "Smartwatch",
                description: "Fitness tracking smartwatch",
                price: 250,
                categoryId: "electronics",
                createdAt: new Date("2024-02-15T13:00:00Z"),
                updatedAt: new Date("2024-03-15T13:00:00Z"),
            },
            {
                id: "11",
                name: "Coffee Maker",
                description: "Automatic espresso machine",
                price: 300,
                categoryId: "appliances",
                createdAt: new Date("2024-02-20T15:00:00Z"),
                updatedAt: new Date("2024-03-20T15:00:00Z"),
            },
            {
                id: "12",
                name: "Bluetooth Speaker",
                description: "Portable waterproof speaker",
                price: 120,
                categoryId: "electronics",
                createdAt: new Date("2024-02-25T17:00:00Z"),
                updatedAt: new Date("2024-03-25T17:00:00Z"),
            },
        ].map((product) => [product.id, product])
    )

    async save(product: Product): Promise<void> {
        this.products.set(product.id, product)
    }

    async findById(id: string): Promise<Product> {
        const product = this.products.get(id)

        if (!product) {
            throw new NotFoundError("Product not found")
        }

        return product
    }

    async findPaginated(
        page: number,
        pageSize: number
    ): Promise<PaginatedResult<Product[]>> {
        const allProducts = Array.from(this.products.values())
        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        const paginatedProducts = allProducts.slice(startIndex, endIndex)

        return {
            data: paginatedProducts,
            pagination: {
                page,
                pageSize,
                totalItems: allProducts.length,
                totalPages: Math.ceil(allProducts.length / pageSize),
            },
        }
    }

    async delete(id: string): Promise<void> {
        this.products.delete(id)
    }
}
