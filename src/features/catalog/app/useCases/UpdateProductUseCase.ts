import { Product } from "@/features/catalog/domain/entities/Product"
import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"

export class UpdateProductUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(input: UpdateProductInput): Promise<void> {
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

export interface UpdateProductInput {
    id: string
    name: string
    description?: string
    price: number
    categoryId: string
}
