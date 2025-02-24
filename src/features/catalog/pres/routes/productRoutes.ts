import express from "express"

import {
    CreateProductController,
    DeleteProductController,
    GetProductByIdController,
    UpdateProductController,
} from "@/features/catalog/pres/controllers"
import { container } from "@/shared/di"
import { catalogTokens } from "@/shared/di/tokens/catalogTokens"
import { asyncHandler } from "@/shared/utils/asyncHandler"

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

/**
 * @swagger
 * /v1/catalog/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 */
productRouter.post(
    "/products",
    asyncHandler(createProductController.handle.bind(createProductController))
)

/**
 * @swagger
 * /v1/catalog/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid ID
 */
productRouter.get(
    "/products/:id",
    asyncHandler(getProductByIdController.handle.bind(getProductByIdController))
)

/**
 * @swagger
 * /v1/catalog/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
productRouter.put(
    "/products:id",
    asyncHandler(updateProductController.handle.bind(updateProductController))
)

/**
 * @swagger
 * /v1/catalog/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to delete
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Product not found
 */
productRouter.delete(
    "/products/:id",
    asyncHandler(deleteProductController.handle.bind(deleteProductController))
)

export { productRouter }
