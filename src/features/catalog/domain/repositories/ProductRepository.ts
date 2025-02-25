import { Product } from "@/features/catalog/domain/entities/Product"

import type { PaginatedResult } from "@/lib/types/pagination"

export interface ProductRepository {
    save(product: Product): Promise<void>
    findById(id: string): Promise<Product>
    findPaginated(
        page: number,
        pageSize: number
    ): Promise<PaginatedResult<Product[]>>
    delete(id: string): Promise<void>
}
