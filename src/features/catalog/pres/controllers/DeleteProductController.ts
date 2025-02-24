import { Request, Response } from "express"
import { inject, injectable } from "inversify"

import { DeleteProductUseCase } from "@/features/catalog/app/useCases/DeleteProductUseCase"
import { catalogTokens } from "@/shared/di/tokens/catalogTokens"
import { StatusCodes } from "http-status-codes"

@injectable()
export class DeleteProductController {
    constructor(
        @inject(catalogTokens.useCases.DeleteProduct)
        private deleteProductUseCase: DeleteProductUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params

        await this.deleteProductUseCase.execute(id)

        return response.status(StatusCodes.NO_CONTENT)
    }
}
