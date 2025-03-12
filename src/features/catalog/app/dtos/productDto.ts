export type ProductDto = {
    id: string
    name: string
    slug: string
    description: string
    price: number
    categoryId: string
    createdAt: string
    updatedAt: string
}

export interface ProductFilter {
    name?: string
    minPrice?: number
    maxPrice?: number
    slug?: string
    createdAfter?: Date
    createdBefore?: Date
}
