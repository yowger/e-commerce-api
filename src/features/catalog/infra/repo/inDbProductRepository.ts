import { Kysely } from "kysely"

import { ProductRepository } from "@/features/catalog/domain/repositories/ProductRepository"
import { ProductMapper } from "@/features/catalog/pres/mappers/ProductMappers"
import { Product } from "@/features/catalog/domain/entities/Product"
import { PaginatedResult } from "@/lib/types/pagination"

import type { Database } from "@/lib/db/types"

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
        pageSize: number
    ): Promise<PaginatedResult<Product[]>> {
        const offset = (page - 1) * pageSize

        const [data, totalItemsResult] = await Promise.all([
            this.db
                .selectFrom("products")
                .selectAll()
                .limit(pageSize)
                .offset(offset)
                .execute(),
            this.db
                .selectFrom("products")
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
