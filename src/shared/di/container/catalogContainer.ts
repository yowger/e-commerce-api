import { Container } from "inversify"

import {
    CreateProductUseCase,
    DeleteProductUseCase,
    GetProductByIdUseCase,
} from "@/features/catalog/app/useCases"
import { catalogTokens } from "@/shared/di/tokens/catalogTokens"
import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"
import { InMemoryProductRepository } from "@/features/catalog/infra/repo/InMemoryProductRepository"
import {
    CreateProductController,
    DeleteProductController,
    GetProductByIdController,
    UpdateProductController,
} from "@/features/catalog/pres/controllers"

export function configureCatalogBindings(container: Container) {
    container
        .bind<ProductRepository>(catalogTokens.repositories.Product)
        .to(InMemoryProductRepository)
        .inSingletonScope()

    container
        .bind<CreateProductUseCase>(catalogTokens.useCases.CreateProduct)
        .to(CreateProductUseCase)
        .inTransientScope()

    container
        .bind<DeleteProductUseCase>(catalogTokens.useCases.DeleteProduct)
        .to(DeleteProductUseCase)
        .inTransientScope()

    container
        .bind<GetProductByIdUseCase>(catalogTokens.useCases.GetProductById)
        .to(GetProductByIdUseCase)
        .inTransientScope()

    container
        .bind<CreateProductController>(catalogTokens.controllers.CreateProduct)
        .to(CreateProductController)
        .inTransientScope()

    container
        .bind<DeleteProductController>(catalogTokens.controllers.DeleteProduct)
        .to(DeleteProductController)
        .inTransientScope()

    container
        .bind<GetProductByIdController>(
            catalogTokens.controllers.GetProductById
        )
        .to(GetProductByIdController)
        .inTransientScope()

    container
        .bind<UpdateProductController>(catalogTokens.controllers.UpdateProduct)
        .to(UpdateProductController)
        .inTransientScope()
}
