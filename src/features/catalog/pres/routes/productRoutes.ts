import express from "express"

import {
    CreateProductController,
    DeleteProductController,
    GetProductBySlugController,
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
const getProductBySlugController = container.get<GetProductBySlugController>(
    catalogTokens.controllers.GetProductBySlug
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 */
productRouter.post(
    "/",
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
    "/:",
    asyncHandler(
        getProductBySlugController.handle.bind(getProductBySlugController)
    )
)

// TODO: move swagger document
/**
 * @swagger
 * /v1/products:
 *   get:
 *     summary: Get a paginated and filtered list of products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: The page number (default is 1)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           enum: [10, 20, 30, 40, 50]
 *         required: false
 *         description: Number of products per page (default is 10)
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: |
 *           Filter products by name.
 *           This is case-insensitive.
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           minimum: 0
 *         required: false
 *         description: |
 *           Filter products by minimum price.
 *           The value must be greater than or equal to 0.
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           minimum: 0
 *         required: false
 *         description: |
 *           Filter products by maximum price.
 *           The value must be greater than or equal to 0.
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: false
 *         description: |
 *           Filter products by category ID.
 *           The value must be a valid UUID.
 *       - in: query
 *         name: createdAfter
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: |
 *           Filter products created after a specific date.
 *           Format: YYYY-MM-DD
 *       - in: query
 *         name: createdBefore
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: |
 *           Filter products created before a specific date.
 *           Format: YYYY-MM-DD
 *     responses:
 *       200:
 *         description: Paginated and filtered list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
productRouter.get(
    "/",
    asyncHandler(getProductsController.handle.bind(getProductsController))
)

/**
 * @swagger
 * /v1/products/{slug}:
 *   put:
 *     summary: Update a product by slug
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: Slug of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
productRouter.put(
    ":slug",
    asyncHandler(updateProductController.handle.bind(updateProductController))
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productRouter.delete(
    "/:id",
    asyncHandler(deleteProductController.handle.bind(deleteProductController))
)

export { productRouter }
