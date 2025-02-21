import { inject, injectable } from "inversify"

import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"
import { catalogTokens } from "@/shared/di/tokens/catalogTokens"

@injectable()
export class DeleteProductUseCase {
    constructor(
        @inject(catalogTokens.repositories.Product)
        private productRepository: ProductRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.productRepository.delete(id)
    }
}
