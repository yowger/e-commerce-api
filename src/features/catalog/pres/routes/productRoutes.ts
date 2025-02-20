import express from "express"

import { CreateProductController } from "@/features/catalog/pres/controllers/CreateProductController"

const productRouter = express.Router()
const createProductController = new CreateProductController()

productRouter.post(
    "/products",
    createProductController.handle.bind(createProductController)
)

export { productRouter }
