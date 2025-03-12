export const controllers = {
    GetCategories: Symbol.for("getCategoriesController"),
    GetCategoryByIdOrSlug: Symbol.for("GetCategoryByIdOrSlugController"),
}

export const useCases = {
    GetCategories: Symbol.for("getCategoriesUseCase"),
    GetCategoryByIdOrSlug: Symbol.for("GetCategoryByIdOrSlugUseCase"),
}

export const repositories = {
    Category: Symbol.for("CategoryRepository"),
}

export const categoryTokens = {
    controllers,
    useCases,
    repositories,
}
