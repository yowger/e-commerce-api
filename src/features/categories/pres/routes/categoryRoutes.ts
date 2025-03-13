import express from "express"

import { GetCategoriesController } from "@/features/categories/pres/controllers/getCategoriesController"
import { GetCategoryByIdController } from "@/features/categories/pres/controllers/getCategoryByIdController"
import { GetCategoryBySlugController } from "@/features/categories/pres/controllers/getCategoryBySlugController"

import { container } from "@/lib/di/container"
import { categoryTokens } from "@/lib/di/tokens/categoryTokens"
import { asyncHandler } from "@/lib/http/utils/asyncHandler"

const categoryRouter = express.Router()

const getCategoriesController = container.get<GetCategoriesController>(
    categoryTokens.controllers.GetCategories
)

const getCategoryByIdController = container.get<GetCategoryByIdController>(
    categoryTokens.controllers.GetCategoryById
)

const getCategoryBySlugController = container.get<GetCategoryBySlugController>(
    categoryTokens.controllers.GetCategoryBySlug
)

/**
 * @swagger
 * /v1/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error
 */
categoryRouter.get(
    "/",
    asyncHandler(getCategoriesController.handle.bind(getCategoriesController))
)

/**
 * @swagger
 * /v1/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.get(
    "/:id",
    asyncHandler(
        getCategoryByIdController.handle.bind(getCategoryByIdController)
    )
)

/**
 * @swagger
 * /v1/categories/slug/{slug}:
 *   get:
 *     summary: Get category by slug
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The category slug
 *     responses:
 *       200:
 *         description: Category data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
categoryRouter.get(
    "/slug/:slug",
    asyncHandler(
        getCategoryBySlugController.handle.bind(getCategoryBySlugController)
    )
)

export { categoryRouter }
