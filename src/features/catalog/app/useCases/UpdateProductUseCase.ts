import { inject, injectable } from "inversify"

import { Product } from "@/features/catalog/domain/entities/Product"
import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"
import { catalogTokens } from "@/shared/di/tokens/catalogTokens"

@injectable()
export class UpdateProductUseCase {
    constructor(
        @inject(catalogTokens.repositories.Product)
        private productRepository: ProductRepository
    ) {}

    async execute(input: UpdateProductInput): Promise<void> {
        const product = new Product({
            id: input.id,
            name: input.name,
            description: input.description,
            price: input.price,
            categoryId: input.categoryId,
        })

        await this.productRepository.save(product)
    }
}

export interface UpdateProductInput {
    id: string
    name: string
    description?: string
    price: number
    categoryId: string
}
