import { inject, injectable } from "inversify"

import { Product } from "@/features/catalog/domain/entities/Product"
import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"
import { catalogTokens } from "@/shared/di/tokens/catalogTokens"

@injectable()
export class GetProductByIdUseCase {
    constructor(
        @inject(catalogTokens.repositories.Product)
        private productRepository: ProductRepository
    ) {}

    async execute(id: string): Promise<Product | null> {
        return this.productRepository.findById(id)
    }
}
