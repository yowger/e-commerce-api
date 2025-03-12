export const controllers = {
    CreateProduct: Symbol.for("CreateProductController"),
    DeleteProduct: Symbol.for("DeleteProductController"),
    GetProducts: Symbol.for("GetProductsController"),
    GetProductBySlug: Symbol.for("GetProductBySlugController"),
    UpdateProduct: Symbol.for("UpdateProductController"),
}

export const useCases = {
    CreateProduct: Symbol.for("CreateProductUseCase"),
    DeleteProduct: Symbol.for("DeleteProductUseCase"),
    GetProducts: Symbol.for("GetProductsUseCase"),
    GetProductBySlug: Symbol.for("GetProductBySlugUseCase"),
    UpdateProduct: Symbol.for("UpdateProductUseCase"),
}

export const repositories = {
    Product: Symbol.for("ProductRepository"),
}

export const catalogTokens = {
    controllers,
    useCases,
    repositories,
}
