import { Container } from "inversify"

import { db } from "@/lib/db/connect"
import { categoryTokens } from "@/lib/di/tokens/categoryTokens"
import { CategoryRepository } from "@/features/categories/domain/repositories/CategoryRepository"
import { GetCategoryUseCase } from "@/features/categories/app/useCases/getProductUseCase"
import { GetCategoriesController } from "@/features/categories/pres/controllers/getCategoriesController"
import { InDbCategoryRepository } from "@/features/categories/infra/repo/inDbCategoryRepository"

export function configureCategoryBindings(container: Container) {
    container
        .bind<CategoryRepository>(categoryTokens.repositories.Category)
        .toDynamicValue(() => new InDbCategoryRepository(db))

    container
        .bind<GetCategoryUseCase>(categoryTokens.useCases.GetCategories)
        .to(GetCategoryUseCase)
        .inTransientScope()

    container
        .bind<GetCategoriesController>(categoryTokens.controllers.GetCategories)
        .to(GetCategoriesController)
        .inTransientScope()
}
