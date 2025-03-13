import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"

import { GetCategoryByIdUseCase } from "@/features/categories/app/useCases/getCategoryByIdUseCase"
import { categoryTokens } from "@/lib/di/tokens/categoryTokens"

@injectable()
export class GetCategoryByIdController {
    constructor(
        @inject(categoryTokens.useCases.GetCategoryById)
        private getCategoryByIdUseCase: GetCategoryByIdUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        const category = await this.getCategoryByIdUseCase.execute(id)

        if (!category) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Category not found" })
        }

        return res.status(StatusCodes.OK).json(category)
    }
}
