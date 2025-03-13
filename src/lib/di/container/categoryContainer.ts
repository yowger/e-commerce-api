import { Container } from "inversify";

import { db } from "@/lib/db/connect";
import { categoryTokens } from "@/lib/di/tokens/categoryTokens";
import { CategoryRepository } from "@/features/categories/domain/repositories/CategoryRepository";
import { GetCategoryUseCase } from "@/features/categories/app/useCases/getCategoriesUseCase";
import { GetCategoriesController } from "@/features/categories/pres/controllers/getCategoriesController";
import { InDbCategoryRepository } from "@/features/categories/infra/repo/inDbCategoryRepository";
import { GetCategoryByIdController } from "@/features/categories/pres/controllers/getCategoryByIdController";
import { GetCategoryBySlugController } from "@/features/categories/pres/controllers/getCategoryBySlugController";
import { GetCategoryByIdUseCase } from "@/features/categories/app/useCases/getCategoryByIdUseCase";
import { GetCategoryBySlugUseCase } from "@/features/categories/app/useCases/getCategoryBySlugUseCase";

export function configureCategoryBindings(container: Container) {
    container
        .bind<CategoryRepository>(categoryTokens.repositories.Category)
        .toDynamicValue(() => new InDbCategoryRepository(db));

    container
        .bind<GetCategoryUseCase>(categoryTokens.useCases.GetCategories)
        .to(GetCategoryUseCase)
        .inTransientScope();

    container
        .bind<GetCategoryByIdUseCase>(categoryTokens.useCases.GetCategoryById)
        .to(GetCategoryByIdUseCase)
        .inTransientScope();

    container
        .bind<GetCategoryBySlugUseCase>(categoryTokens.useCases.GetCategoryBySlug)
        .to(GetCategoryBySlugUseCase)
        .inTransientScope();

    container
        .bind<GetCategoriesController>(categoryTokens.controllers.GetCategories)
        .to(GetCategoriesController)
        .inTransientScope();

    container
        .bind<GetCategoryByIdController>(categoryTokens.controllers.GetCategoryById)
        .to(GetCategoryByIdController)
        .inTransientScope();

    container
        .bind<GetCategoryBySlugController>(categoryTokens.controllers.GetCategoryBySlug)
        .to(GetCategoryBySlugController)
        .inTransientScope();
}
