import { ProductDto } from "@/features/catalog/app/dtos/productDto"
import { Product } from "@/features/catalog/domain/entities/Product"

// TODO: add 'camelcase-keys' maybe
export class ProductMapper {
    static toDTO(product: Product): ProductDto {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            categoryId: product.categoryId,
            description: product.description,
            createdAt: product.createdAt.toISOString(),
            updatedAt: product.updatedAt.toISOString(),
        }
    }

    static toDomain(row: any): Product {
        return new Product({
            id: row.id,
            name: row.name,
            price: row.price,
            categoryId: row.categoryId ?? row.category_id,
            description: row.description,
            createdAt: new Date(row.createdAt ?? row.created_at),
            updatedAt: new Date(row.updatedAt ?? row.updated_at),
        })
    }

    static toPersistence(product: Product): any {
        return {
            id: product.id,
            name: product.name,
            description: product.description ?? null,
            price: product.price,
            category_id: product.categoryId,
            created_at: product.createdAt ?? new Date(),
            updated_at: new Date(),
        }
    }
}
