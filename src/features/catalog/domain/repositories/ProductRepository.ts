import { Product } from "@/features/catalog/domain/entities/Product"

import type { ProductFilter } from "@/features/catalog/app/dtos/productDto"
import type { PaginatedResult } from "@/lib/types/pagination"

export interface ProductRepository {
    save(product: Product): Promise<void>
    findBySlug(slug: string): Promise<Product | null>
    findPaginated(
        page: number,
        pageSize: number,
        filter?: ProductFilter
    ): Promise<PaginatedResult<Product[]>>
    delete(id: string): Promise<void>
    // TODO: make update
}
