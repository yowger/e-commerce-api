import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"

export class DeleteProductUseCase {
    constructor(private productRepository: ProductRepository) {}

    async execute(id: string): Promise<void> {
        await this.productRepository.delete(id)
    }
}
