import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "inversify"

import { DeleteProductUseCase } from "@/features/catalog/app/useCases/DeleteProductUseCase"
import { catalogTokens } from "@/lib/di/tokens/catalogTokens"

@injectable()
export class DeleteProductController {
    constructor(
        @inject(catalogTokens.useCases.DeleteProduct)
        private deleteProductUseCase: DeleteProductUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        await this.deleteProductUseCase.execute(id)

        return res.status(StatusCodes.NO_CONTENT)
    }
}
