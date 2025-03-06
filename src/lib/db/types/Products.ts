import { Generated } from "kysely"

export interface ProductTable {
    id: Generated<string>
    name: string
    description?: string
    price: number
    category_id: string
    created_at: Generated<Date>
    updated_at: Generated<Date>
}
