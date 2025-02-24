import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"

import { GetProductsUseCase } from "@/features/catalog/app/useCases/GetProductsUseCase"
import { catalogTokens } from "@/shared/di/tokens/catalogTokens"

@injectable()
export class GetProductsController {
    constructor(
        @inject(catalogTokens.useCases.GetProducts)
        private getProductsUseCase: GetProductsUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const page = parseInt(req.query.page as string) || 1
        const pageSize = parseInt(req.query.pageSize as string) || 10

        const product = await this.getProductsUseCase.execute(page, pageSize)

        return res.status(StatusCodes.OK).json(product)
    }
}
