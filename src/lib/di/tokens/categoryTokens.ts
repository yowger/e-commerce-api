export const controllers = {
    GetCategories: Symbol.for("GetCategoriesController"),
    GetCategoryById: Symbol.for("GetCategoryByIdController"),
    GetCategoryBySlug: Symbol.for("GetCategoryBySlugController"),
}

export const useCases = {
    GetCategories: Symbol.for("GetCategoriesUseCase"),
    GetCategoryById: Symbol.for("GetCategoryByIdUseCase"),
    GetCategoryBySlug: Symbol.for("GetCategoryBySlugUseCase"),
}

export const repositories = {
    Category: Symbol.for("CategoryRepository"),
}

export const categoryTokens = {
    controllers,
    useCases,
    repositories,
}
