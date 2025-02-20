import { Request, Response } from "express"

import { CreateProductUseCase } from "@/features/catalog/app/useCases/CreateProductUseCase"
import { InMemoryProductRepository } from "@/features/catalog/infra/InMemoryProductRepository"

export class CreateProductController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id, name, description, price, categoryId } = req.body

        const ProductRepository = new InMemoryProductRepository()
        const createProductUseCase = new CreateProductUseCase(ProductRepository)

        try {
            await createProductUseCase.execute({
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
