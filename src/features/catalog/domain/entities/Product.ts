export class Product {
    public readonly id: string | null
    public readonly name: string
    public readonly description: string | null
    public readonly price: number
    public readonly categoryId: string
    public readonly createdAt: Date
    public readonly updatedAt: Date

    constructor(params: {
        id?: string
        name: string
        description?: string
        price: number
        categoryId: string
        createdAt?: Date
        updatedAt?: Date
    }) {
        this.id = params.id
        this.name = params.name
        this.description = params.description
        this.price = params.price
        this.categoryId = params.categoryId
        this.createdAt = params.createdAt ?? new Date()
        this.updatedAt = params.updatedAt ?? new Date()
    }
}
