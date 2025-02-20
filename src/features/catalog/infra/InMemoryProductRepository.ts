import { Product } from "@/features/catalog/domain/entities/Product"
import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"

import type { PaginatedResult } from "@/shared/types/pagination"

export class InMemoryProductRepository implements ProductRepository {
    private products: Map<string, Product> = new Map()

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
