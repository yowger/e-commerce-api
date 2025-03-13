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
                slug: category.slug,
                created_at: category.createdAt,
                updated_at: category.updatedAt,
            })
            .execute()
    }

    async findById(id: string): Promise<Category | null> {
        const category = await this.db
            .selectFrom("categories")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst()

        return category ? this.mapToEntity(category) : null
    }

    async findBySlug(slug: string): Promise<Category | null> {
        const category = await this.db
            .selectFrom("categories")
            .selectAll()
            .where("slug", "=", slug)
            .executeTakeFirst()

        return category ? this.mapToEntity(category) : null
    }

    async getAll(): Promise<Category[]> {
        const categories = await this.db
            .selectFrom("categories")
            .selectAll()
            .execute()

        return categories.map(this.mapToEntity)
    }

    async delete(id: string): Promise<void> {
        await this.db.deleteFrom("categories").where("id", "=", id).execute()
    }

    private mapToEntity(category: any): Category {
        return new Category({
            id: category.id,
            name: category.name,
            slug: category.slug,
            createdAt: category.created_at,
            updatedAt: category.updated_at,
        })
    }
}
