export const controllers = {
    GetCategories: Symbol.for("getCategoriesController"),
}

export const useCases = {
    GetCategories: Symbol.for("getCategoriesUseCase"),
}

export const repositories = {
    Category: Symbol.for("CategoryRepository"),
}

export const categoryTokens = {
    controllers,
    useCases,
    repositories,
}
