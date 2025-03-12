import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"

import { GetCategoryUseCase } from "@/features/categories/app/useCases/getCategoriesUseCase"
import { categoryTokens } from "@/lib/di/tokens/categoryTokens"

@injectable()
export class GetCategoriesController {
    constructor(
        @inject(categoryTokens.useCases.GetCategories)
        private getCategoryUseCase: GetCategoryUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const categories = await this.getCategoryUseCase.execute()

        return res.status(StatusCodes.OK).json(categories)
    }
}
