import { Kysely } from "kysely"

import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"
import { ProductMapper } from "@/features/catalog/pres/mappers/ProductMappers"
import { Product } from "@/features/catalog/domain/entities/Product"

import type { ProductFilter } from "@/features/catalog/app/dtos/productDto"
import type { Database } from "@/lib/db/types"
import type { PaginatedResult } from "@/lib/types/pagination"

export class InDbProductRepository implements ProductRepository {
    constructor(private readonly db: Kysely<Database>) {}

    async save(product: Product): Promise<void> {
        await this.db
            .insertInto("products")
            .values(ProductMapper.toPersistence(product))
            .execute()
    }

    async findBySlug(slug: string): Promise<Product | null> {
        const product = await this.db
            .selectFrom("products")
            .leftJoin("categories", "categories.id", "products.category_id")
            .selectAll()
            .select([
                "categories.id as category_id",
                "categories.name as category_name",
            ])
            .where("products.slug", "=", slug)
            .executeTakeFirst()

        if (!product) {
            return null
        }

        return ProductMapper.toDomain({
            ...product,
            categoryId: product.category_id,
            categoryName: product.category_name,
        })
    }

    async findPaginated(
        page: number,
        pageSize: number,
        filter?: ProductFilter
    ): Promise<PaginatedResult<Product[]>> {
        const offset = (page - 1) * pageSize

        let query = this.db
            .selectFrom("products")
            .leftJoin("categories", "categories.id", "products.category_id")
            .select([
                "products.id",
                "products.name",
                "products.description",
                "products.price",
                "products.slug",
                "categories.id as category_id",
                "categories.name as category_name",
                "products.created_at",
                "products.updated_at",
            ])

        if (filter?.name) {
            query = query.where("name", "ilike", `%${filter.name}%`)
        }

        if (filter?.minPrice !== undefined) {
            query = query.where("price", ">=", filter.minPrice)
        }

        if (filter?.maxPrice !== undefined) {
            query = query.where("price", "<=", filter.maxPrice)
        }

        if (filter?.slug) {
            query = query.where("slug", "=", filter.slug)
        }

        if (filter?.createdAfter) {
            query = query.where("created_at", ">=", filter.createdAfter)
        }

        if (filter?.createdBefore) {
            query = query.where("created_at", "<=", filter.createdBefore)
        }

        const [data, totalItemsResult] = await Promise.all([
            query.limit(pageSize).offset(offset).execute(),
            query
                .clearSelect()
                .select(({ fn }) => fn.countAll().as("totalItems"))
                .executeTakeFirst(),
        ])

        const totalItems = Number(totalItemsResult?.totalItems ?? 0)
        const totalPages = Math.ceil(totalItems / pageSize)

        return {
            data: data.map((product) =>
                ProductMapper.toDomain({
                    ...product,
                    categoryId: product.category_id,
                    categoryName: product.category_name,
                })
            ),
            pagination: { page, pageSize, totalItems, totalPages },
        }
    }

    async delete(id: string): Promise<void> {
        await this.db.deleteFrom("products").where("id", "=", id).execute()
    }
}
