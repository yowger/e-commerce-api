import { ProductDto } from "@/features/catalog/pres/dtos/productDto"
import { Product } from "@/features/catalog/domain/entities/Product"

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

    static toDomain(dto: ProductDto): Product {
        return new Product({
            id: dto.id,
            name: dto.name,
            price: dto.price,
            categoryId: dto.categoryId,
            description: dto.description,
            createdAt: new Date(dto.createdAt),
            updatedAt: new Date(dto.updatedAt),
        })
    }
}
