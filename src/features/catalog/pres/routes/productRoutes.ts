import express from "express"

import {
    CreateProductController,
    DeleteProductController,
    GetProductByIdController,
    UpdateProductController,
} from "@/features/catalog/pres/controllers"
import { container } from "@/shared/di"
import { catalogTokens } from "@/shared/di/tokens/catalogTokens"

const productRouter = express.Router()

const createProductController = container.get<CreateProductController>(
    catalogTokens.controllers.CreateProduct
)
const deleteProductController = container.get<DeleteProductController>(
    catalogTokens.controllers.DeleteProduct
)
const getProductByIdController = container.get<GetProductByIdController>(
    catalogTokens.controllers.GetProductById
)
const updateProductController = container.get<UpdateProductController>(
    catalogTokens.controllers.UpdateProduct
)

productRouter.post(
    "/products",
    createProductController.handle.bind(createProductController)
)
productRouter.get(
    "/products/:id",
    getProductByIdController.handle.bind(getProductByIdController)
)
productRouter.put(
    "/products:id",
    updateProductController.handle.bind(updateProductController)
)
productRouter.delete(
    "/products/:id",
    deleteProductController.handle.bind(deleteProductController)
)

export { productRouter }
