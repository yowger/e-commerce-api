import { Category } from "@/features/categories/domain/entities/Category"

export interface CategoryRepository {
    save(category: Category): Promise<void>
    getAll(): Promise<Category[]>

    findById(id: string): Promise<Category | null>
    findBySlug(slug: string): Promise<Category | null>

    delete(id: string): Promise<void>
}
