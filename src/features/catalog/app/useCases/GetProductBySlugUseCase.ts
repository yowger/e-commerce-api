import { inject, injectable } from "inversify"

import { Product } from "@/features/catalog/domain/entities/Product"
import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"

@injectable()
export class GetProductBySlugUseCase {
    constructor(
        @inject(catalogTokens.repositories.Product)
        private productRepository: ProductRepository
    ) {}

    async execute(slug: string): Promise<Product | null> {
        return this.productRepository.findBySlug(slug)
    }
}
