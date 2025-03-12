import { inject, injectable } from "inversify"
import slugify from "slugify"

import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"
import { CategoryRepository } from "@/features/categories/domain/repositories/CategoryRepository"
import { Product } from "@/features/catalog/domain/entities/Product"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"
import { categoryTokens } from "@/lib/di/tokens/categoryTokens"
import { NotFoundError } from "@/lib/errors/NotFoundError "

@injectable()
export class CreateProductUseCase {
    constructor(
        @inject(catalogTokens.repositories.Product)
        private productRepository: ProductRepository,
        @inject(categoryTokens.repositories.Category)
        private categoryRepository: CategoryRepository
    ) {}

    async execute(input: CreateProductInput): Promise<void> {
        const category = await this.categoryRepository.findByIdOrSlug(
            input.categoryId
        )

        if (!category) {
            throw new NotFoundError("Category not found")
        }

        const slug = slugify(input.name, { lower: true, strict: true })

        const product = new Product({
            name: input.name,
            slug,
            description: input.description,
            price: input.price,
            categoryId: input.categoryId,
        })

        await this.productRepository.save(product)
    }
}

export interface CreateProductInput {
    name: string
    description?: string
    price: number
    categoryId: string
}
