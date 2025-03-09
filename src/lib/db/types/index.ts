import { ProductTable } from "./Products"
import { CategoryTable } from "./Category"

export interface Database {
    products: ProductTable
    categories: CategoryTable
}
