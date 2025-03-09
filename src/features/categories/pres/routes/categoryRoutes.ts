import express from "express"

import { GetCategoriesController } from "@/features/categories/pres/controllers/getCategoriesController"
import { container } from "@/lib/di/container"
import { categoryTokens } from "@/lib/di/tokens/categoryTokens"
import { asyncHandler } from "@/lib/http/utils/asyncHandler"

const categoryRouter = express.Router()

const getCategoriesController = container.get<GetCategoriesController>(
    categoryTokens.controllers.GetCategories
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

export { categoryRouter }
