import { Generated } from "kysely"

export interface CategoryTable {
    id: Generated<string>
    name: string
    description?: string
    slug?: string
    created_at: Generated<Date>
    updated_at: Generated<Date>
}
