import { Product } from "@/features/catalog/domain/entities/Product"
import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"

export class GetProductByIdUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(id: string): Promise<Product | null> {
        return this.productRepository.findById(id)
    }
}
