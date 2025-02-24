export const controllers = {
    CreateProduct: Symbol.for("CreateProductController"),
    DeleteProduct: Symbol.for("DeleteProductController"),
    GetProducts: Symbol.for("GetProductsController"),
    GetProductById: Symbol.for("GetProductByIdController"),
    UpdateProduct: Symbol.for("UpdateProductController"),
}

export const useCases = {
    CreateProduct: Symbol.for("CreateProductUseCase"),
    DeleteProduct: Symbol.for("DeleteProductUseCase"),
    GetProducts: Symbol.for("GetProductsUseCase"),
    GetProductById: Symbol.for("GetProductByIdUseCase"),
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
