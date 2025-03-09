export class Category {
    public readonly id: string | null
    public readonly name: string
    public readonly createdAt: Date
    public readonly updatedAt: Date

    constructor(params: {
        id?: string
        name: string
        createdAt?: Date
        updatedAt?: Date
    }) {
        this.id = params.id ?? null
        this.name = params.name
        this.createdAt = params.createdAt ?? new Date()
        this.updatedAt = params.updatedAt ?? new Date()
    }
}
