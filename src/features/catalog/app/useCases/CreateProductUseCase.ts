import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"
import { Product } from "@/features/catalog/domain/entities/Product"

export class CreateProductUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(input: CreateProductInput): Promise<void> {
        const product = new Product({
            id: input.id,
            name: input.name,
            description: input.description,
            price: input.price,
            categoryId: input.categoryId,
        })

        // validation
        // if (if product is not valid) {
        //     throw new Error("Invalid product data")
        // }

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
