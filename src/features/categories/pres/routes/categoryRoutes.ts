import express from "express"

import { GetCategoriesController } from "@/features/categories/pres/controllers/getCategoriesController"
import { GetCategoryByIdOrSlugController } from "@/features/categories/pres/controllers/getCategoryByIdOrSlugController"
import { container } from "@/lib/di/container"
import { categoryTokens } from "@/lib/di/tokens/categoryTokens"
import { asyncHandler } from "@/lib/http/utils/asyncHandler"

const categoryRouter = express.Router()

const getCategoriesController = container.get<GetCategoriesController>(
    categoryTokens.controllers.GetCategories
)

const getCategoryByIdOrSlugController =
    container.get<GetCategoryByIdOrSlugController>(
        categoryTokens.controllers.GetCategoryByIdOrSlug
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
 * /v1/categories/{identifier}:
 *   get:
 *     summary: Get category by ID or slug
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID or slug
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
    "/:identifier",
    asyncHandler(
        getCategoryByIdOrSlugController.handle.bind(
            getCategoryByIdOrSlugController
        )
    )
)

export { categoryRouter }
