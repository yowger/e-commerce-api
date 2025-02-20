import { Product } from "@/features/catalog/domain/entities/Product"

import type { PaginatedResult } from "@/shared/types/pagination"

export interface ProductRepository {
    save(product: Product): Promise<void>
    findById(id: string): Promise<Product | null>
    findPaginated(
        page: number,
        pageSize: number
    ): Promise<PaginatedResult<Product[]>>
    delete(id: string): Promise<void>
}
