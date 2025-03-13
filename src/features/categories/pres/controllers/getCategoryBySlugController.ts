import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"

import { GetCategoryBySlugUseCase } from "@/features/categories/app/useCases/getCategoryBySlugUseCase"
import { categoryTokens } from "@/lib/di/tokens/categoryTokens"

@injectable()
export class GetCategoryBySlugController {
    constructor(
        @inject(categoryTokens.useCases.GetCategoryBySlug)
        private getCategoryBySlugUseCase: GetCategoryBySlugUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { slug } = req.params

        const category = await this.getCategoryBySlugUseCase.execute(slug)

        if (!category) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Category not found" })
        }

        return res.status(StatusCodes.OK).json(category)
    }
}
