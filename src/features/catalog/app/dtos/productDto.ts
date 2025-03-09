export type ProductDto = {
    id: string
    name: string
    description: string
    price: number
    categoryId: string
    createdAt: string
    updatedAt: string
}

export interface ProductFilter  {
    name?: string
    minPrice?: number
    maxPrice?: number
    categoryId?: string
    createdAfter?: Date
    createdBefore?: Date
}