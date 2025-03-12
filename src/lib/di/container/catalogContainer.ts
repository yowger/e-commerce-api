import { Container } from "inversify"

import {
    CreateProductUseCase,
    DeleteProductUseCase,
    GetProductBySlugUseCase,
} from "@/features/catalog/app/useCases"
import { db } from "@/lib/db/connect"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"
import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"
// import { InMemoryProductRepository } from "@/features/catalog/infra/repo/InMemoryProductRepository"
import { GetProductsUseCase } from "@/features/catalog/app/useCases/GetProductsUseCase"
import {
    CreateProductController,
    DeleteProductController,
    GetProductBySlugController,
    GetProductsController,
    UpdateProductController,
} from "@/features/catalog/pres/controllers"
import { InDbProductRepository } from "@/features/catalog/infra/repo/inDbProductRepository"

export function configureCatalogBindings(container: Container) {
    // container
    //     .bind<ProductRepository>(catalogTokens.repositories.Product)
    //     .to(InMemoryProductRepository)
    //     .inSingletonScope()

    container
        .bind<ProductRepository>(catalogTokens.repositories.Product)
        .toDynamicValue(() => new InDbProductRepository(db))

    container
        .bind<CreateProductUseCase>(catalogTokens.useCases.CreateProduct)
        .to(CreateProductUseCase)
        .inTransientScope()

    container
        .bind<DeleteProductUseCase>(catalogTokens.useCases.DeleteProduct)
        .to(DeleteProductUseCase)
        .inTransientScope()

    container
        .bind<GetProductBySlugUseCase>(catalogTokens.useCases.GetProductBySlug)
        .to(GetProductBySlugUseCase)
        .inTransientScope()

    container
        .bind<GetProductsUseCase>(catalogTokens.useCases.GetProducts)
        .to(GetProductsUseCase)
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
        .bind<GetProductBySlugController>(
            catalogTokens.controllers.GetProductBySlug
        )
        .to(GetProductBySlugController)
        .inTransientScope()

    container
        .bind<GetProductsController>(catalogTokens.controllers.GetProducts)
        .to(GetProductsController)
        .inTransientScope()

    container
        .bind<UpdateProductController>(catalogTokens.controllers.UpdateProduct)
        .to(UpdateProductController)
        .inTransientScope()
}
