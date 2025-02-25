import express from "express"

import {
    CreateProductController,
    DeleteProductController,
    GetProductByIdController,
    GetProductsController,
    UpdateProductController,
} from "@/features/catalog/pres/controllers"
import { container } from "@/lib/di/container"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"
import { asyncHandler } from "@/lib/http/utils/asyncHandler"

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
const getProductsController = container.get<GetProductsController>(
    catalogTokens.controllers.GetProducts
)
const updateProductController = container.get<UpdateProductController>(
    catalogTokens.controllers.UpdateProduct
)

/**
 * @swagger
 * /v1/products:
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
 * /v1/products/{id}:
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
    "/:id",
    asyncHandler(getProductByIdController.handle.bind(getProductByIdController))
)

/**
 * @swagger
 * /v1/products:
 *   get:
 *     summary: Get a paginated list of products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: The page number to retrieve (default is 1)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         required: false
 *         description: The number of products per page (default is 10)
 *     responses:
 *       200:
 *         description: A paginated list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 total:
 *                   type: integer
 *                   description: Total number of products
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 pageSize:
 *                   type: integer
 *                   description: Number of products per page
 *       400:
 *         description: Invalid query parameters
 */
productRouter.get(
    "/",
    asyncHandler(getProductsController.handle.bind(getProductsController))
)

/**
 * @swagger
 * /v1/products/{id}:
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
    ":id",
    asyncHandler(updateProductController.handle.bind(updateProductController))
)

/**
 * @swagger
 * /v1/products/{id}:
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
    "/:id",
    asyncHandler(deleteProductController.handle.bind(deleteProductController))
)

export { productRouter }
