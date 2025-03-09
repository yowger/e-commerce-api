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
    async findById(id: string): Promise<Product | null> {
        const product = await this.db
            .selectFrom("products")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirst()

        if (!product) {
            return null
        }

        return ProductMapper.toDomain(product)
    }

    async findPaginated(
        page: number,
        pageSize: number,
        filter?: ProductFilter
    ): Promise<PaginatedResult<Product[]>> {
        const offset = (page - 1) * pageSize

        let query = this.db.selectFrom("products").selectAll()

        if (filter) {
            if (filter.name) {
                query = query.where("name", "like", `${filter.name}`)
            }
        }

        if (filter?.maxPrice !== undefined) {
            query = query.where("price", "<=", filter.maxPrice)
        }

        if (filter?.categoryId) {
            query = query.where("category_id", "=", filter.categoryId)
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
            data: data.map(ProductMapper.toDomain),
            pagination: { page, pageSize, totalItems, totalPages },
        }
    }
    async delete(id: string): Promise<void> {
        await this.db.deleteFrom("products").where("id", "=", id).execute()
    }
}
