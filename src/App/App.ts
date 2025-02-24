import cors from "cors"
import express, {
    Application,
    ErrorRequestHandler,
    RequestHandler,
    Router,
} from "express"
import helmet from "helmet"
import morgan from "morgan"

import { SwaggerService } from "@/shared/swagger/SwaggerService"

class App {
    public express: Application

    constructor(private swaggerService: SwaggerService) {
        this.express = express()
    }

    public configureDefaultMiddleware(): void {
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: true }))
        // this.express.use(morgan("combined"))
        this.express.use(helmet())
        this.express.use(cors())
    }

    public registerMiddleware(
        middleware: RequestHandler | ErrorRequestHandler
    ): void {
        this.express.use(middleware)
    }

    public registerRoutes(prefix: string, router: Router): void {
        this.express.use(prefix, router)
    }

    public setUpSwaggerDocs(): void {
        this.swaggerService.setupSwaggerDocs(this.express)
    }

    public start(port: number | string): void {
        this.express.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`)
            console.log(
                `API docs are available at:\n - http://localhost:${port}/api-docs\n - http://localhost:${port}/api-docs/json`
            )
        })
    }
}

export default App
