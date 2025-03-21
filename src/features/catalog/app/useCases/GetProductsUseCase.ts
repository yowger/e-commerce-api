import { inject, injectable } from "inversify"

import { Product } from "@/features/catalog/domain/entities/Product"
import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"

import type { ProductFilter } from "@/features/catalog/app/dtos/productDto"
import type { PaginatedResult } from "@/lib/types/pagination"

@injectable()
export class GetProductsUseCase {
    constructor(
        @inject(catalogTokens.repositories.Product)
        private productRepository: ProductRepository
    ) {}

    async execute(
        page: number,
        pageSize: number,
        filter?: ProductFilter
    ): Promise<PaginatedResult<Product[]>> {
        return this.productRepository.findPaginated(page, pageSize, filter)
    }
}
