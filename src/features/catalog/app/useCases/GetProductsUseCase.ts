import { inject, injectable } from "inversify"

import { Product } from "@/features/catalog/domain/entities/Product"
import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"
import { catalogTokens } from "@/shared/di/tokens/catalogTokens"

import type { PaginatedResult } from "@/shared/types/pagination"

@injectable()
export class GetProductsUseCase {
    constructor(
        @inject(catalogTokens.repositories.Product)
        private productRepository: ProductRepository
    ) {}

    async execute(
        page: number,
        pageSize: number
    ): Promise<PaginatedResult<Product[]>> {
        return this.productRepository.findPaginated(page, pageSize)
    }
}
