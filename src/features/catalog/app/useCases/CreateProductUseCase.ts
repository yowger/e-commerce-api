import { inject, injectable } from "inversify"

import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"
import { Product } from "@/features/catalog/domain/entities/Product"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"

@injectable()
export class CreateProductUseCase {
    constructor(
        @inject(catalogTokens.repositories.Product)
        private productRepository: ProductRepository
    ) {}

    async execute(input: CreateProductInput): Promise<void> {
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

export interface CreateProductInput {
    id: string
    name: string
    description?: string
    price: number
    categoryId: string
}
