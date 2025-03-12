import { Category } from "@/features/categories/domain/entities/Category"

export interface CategoryRepository {
    save(category: Category): Promise<void>

    getAll(): Promise<Category[]>
    findByIdOrSlug(slug: string): Promise<Category | null>
    delete(id: string): Promise<void>
}
