export class Product {
    public readonly id: string
    public readonly name: string
    public readonly description: string
    public readonly price: number
    public readonly categoryId: string

    constructor(params: {
        id: string
        name: string
        description?: string
        price: number
        categoryId: string
    }) {
        this.id = params.id
        this.name = params.name
        this.description = params.description
        this.price = params.price
        this.categoryId = params.categoryId
    }
}
