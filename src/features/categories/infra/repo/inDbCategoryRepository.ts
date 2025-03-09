import { Kysely } from "kysely"

import { CategoryRepository } from "@/features/categories/domain/repositories/CategoryRepository"
import { Category } from "@/features/categories/domain/entities/Category"

import type { Database } from "@/lib/db/types"

export class InDbCategoryRepository implements CategoryRepository {
    constructor(private readonly db: Kysely<Database>) {}
    async save(category: Category): Promise<void> {
        await this.db
            .insertInto("categories")
            .values({
                id: category.id,
                name: category.name,
                created_at: category.createdAt,
                updated_at: category.updatedAt,
            })
            .execute()
    }

    async getAll(): Promise<Category[]> {
        const categories = await this.db
            .selectFrom("categories")
            .selectAll()
            .execute()

        return categories.map(
            (c) =>
                new Category({
                    id: c.id,
                    name: c.name,
                    createdAt: c.created_at,
                    updatedAt: c.updated_at,
                })
        )
    }

    async delete(id: string): Promise<void> {
        await this.db.deleteFrom("categories").where("id", "=", id).execute()
    }
}
