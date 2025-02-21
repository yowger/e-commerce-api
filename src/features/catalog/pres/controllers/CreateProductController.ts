import { Request, Response } from "express"
import { inject, injectable } from "inversify"

import { CreateProductUseCase } from "@/features/catalog/app/useCases/CreateProductUseCase"
import { catalogTokens } from "@/shared/di/tokens/catalogTokens"

@injectable()
export class CreateProductController {
    constructor(
        @inject(catalogTokens.useCases.CreateProduct)
        private createProductUseCase: CreateProductUseCase
    ) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id, name, description, price, categoryId } = req.body

        // const ProductRepository = new InMemoryProductRepository()
        // const createProductUseCase = new CreateProductUseCase(ProductRepository)

        try {
            await this.createProductUseCase.execute({
                id,
                name,
                description,
                price,
                categoryId,
            })
        } catch (error) {
            return res.status(400).json()
        }

        return res.status(201).json({ message: "Product created successfully" })
    }
}
