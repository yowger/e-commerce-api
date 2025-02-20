import { Product } from "@/features/catalog/domain/entities/Product"
import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"

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
            },
            {
                id: "2",
                name: "Smartphone",
                description: "Latest model smartphone",
                price: 800,
                categoryId: "electronics",
            },
            {
                id: "3",
                name: "Headphones",
                description: "Noise-canceling headphones",
                price: 150,
                categoryId: "electronics",
            },
            {
                id: "4",
                name: "Backpack",
                description: "Waterproof travel backpack",
                price: 60,
                categoryId: "accessories",
            },
            {
                id: "5",
                name: "Gaming Mouse",
                description: "RGB gaming mouse",
                price: 50,
                categoryId: "electronics",
            },
            {
                id: "6",
                name: "Desk Chair",
                description: "Ergonomic office chair",
                price: 200,
                categoryId: "furniture",
            },
            {
                id: "7",
                name: "Mechanical Keyboard",
                description: "High-quality mechanical keyboard",
                price: 100,
                categoryId: "electronics",
            },
            {
                id: "8",
                name: "Monitor",
                description: "4K ultra-wide monitor",
                price: 500,
                categoryId: "electronics",
            },
            {
                id: "9",
                name: "Running Shoes",
                description: "Comfortable sports shoes",
                price: 90,
                categoryId: "fashion",
            },
            {
                id: "10",
                name: "Smartwatch",
                description: "Fitness tracking smartwatch",
                price: 250,
                categoryId: "electronics",
            },
            {
                id: "11",
                name: "Coffee Maker",
                description: "Automatic espresso machine",
                price: 300,
                categoryId: "appliances",
            },
            {
                id: "12",
                name: "Bluetooth Speaker",
                description: "Portable waterproof speaker",
                price: 120,
                categoryId: "electronics",
            },
        ].map((product) => [product.id, product])
    )

    async save(product: Product): Promise<void> {
        this.products.set(product.id, product)
    }

    async findById(id: string): Promise<Product | null> {
        return this.products.get(id) || null
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
