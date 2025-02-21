import { Request, Response, Application } from "express"
import swaggerUi from "swagger-ui-express"

import swaggerSpec from "@/shared/swagger/swaggerSpec"

export class SwaggerService {
    setupSwaggerDocs(app: Application): void {
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

        app.get("/api-docs/json", (req: Request, res: Response) => {
            console.log("swagger")
            res.setHeader("Content-Type", "application/json")
            res.send(swaggerSpec)
        })
    }
}
