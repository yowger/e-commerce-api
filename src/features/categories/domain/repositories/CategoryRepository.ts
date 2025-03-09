import { Category } from "@/features/categories/domain/entities/Category"

export interface CategoryRepository {
    save(category: Category): Promise<void>
    getAll(): Promise<Category[]>
    delete(id: string): Promise<void>
}
