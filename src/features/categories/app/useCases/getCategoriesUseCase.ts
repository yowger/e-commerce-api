import { inject, injectable } from "inversify"

import { Category } from "@/features/categories/domain/entities/Category"
import { CategoryRepository } from "@/features/categories/domain/repositories/CategoryRepository"
import { categoryTokens } from "@/lib/di/tokens/categoryTokens"

@injectable()
export class GetCategoryUseCase {
    constructor(
        @inject(categoryTokens.repositories.Category)
        private categoryRepository: CategoryRepository
    ) {}

    async execute(): Promise<Category[]> {
        return this.categoryRepository.getAll()
    }
}
