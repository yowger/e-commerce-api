import express from "express"

import { CreateProductController } from "@/features/catalog/pres/controllers/CreateProductController"
import { DeleteProductController } from "@/features/catalog/pres/controllers/DeleteProductController"
import { GetProductByIdController } from "@/features/catalog/pres/controllers/GetProductByIdController"
import { UpdateProductController } from "@/features/catalog/pres/controllers/UpdateProductController"

const productRouter = express.Router()

const createProductController = new CreateProductController()
const getProductByIdController = new GetProductByIdController()
const updateProductController = new UpdateProductController()
const deleteProductController = new DeleteProductController()

productRouter.get("/", (req, res) => {
    console.log("nice")
    res.send("nice")
})
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
