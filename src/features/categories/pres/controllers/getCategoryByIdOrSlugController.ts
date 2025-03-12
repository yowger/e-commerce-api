import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"

import { GetCategoryBySlugUseCase } from "@/features/categories/app/useCases/getCategoryByIdOrSlugUseCase"
import { categoryTokens } from "@/lib/di/tokens/categoryTokens"

@injectable()
export class GetCategoryByIdOrSlugController {
    constructor(
        @inject(categoryTokens.useCases.GetCategoryByIdOrSlug)
        private getCategoryBySlugUseCase: GetCategoryBySlugUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { identifier } = req.params

        const category = await this.getCategoryBySlugUseCase.execute(identifier)

        if (!category) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Category not found" })
        }

        return res.status(StatusCodes.OK).json(category)
    }
}
