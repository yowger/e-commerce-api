import cors from "cors"
import express, {
    Application,
    ErrorRequestHandler,
    Request,
    RequestHandler,
    Router,
} from "express"
import { auth } from "express-openid-connect"
import helmet from "helmet"
import morgan from "morgan"

import { Config } from "@/lib/config"
import { SwaggerService } from "@/lib/swagger/SwaggerService"

class App {
    public express: Application

    constructor(
        private swaggerService: SwaggerService,
        private config: Config
    ) {
        this.express = express()
    }

    public configureDefaultMiddleware(): void {
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: true }))
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

    public setUpMorgan() {
        morgan.token("user-id", (req: Request) => {
            if (req.oidc && req.oidc.user) {
                return req.oidc.user.sub
            }

            return "guest"
        })

        this.express.use(
            morgan(
                ":date[iso] :method :url :status :response-time ms - user-id=:user-id"
            )
        )
    }

    public setUpAuth(): void {
        this.express.use(
            auth({
                authRequired: false,
                auth0Logout: true,
                secret: this.config.auth.AUTH_SECRET,
                baseURL: `${this.config.auth.AUTH_BASE_URL}`,
                clientID: this.config.auth.AUTH_CLIENT_ID,
                issuerBaseURL: this.config.auth.AUTH_ISSUER_BASE_URL,
            })
        )
    }

    public setUpSwaggerDocs(): void {
        this.swaggerService.setupSwaggerDocs(this.express)
    }

    public start(): void {
        this.express.listen(this.config.PORT, () => {
            console.log(
                `Server running on http://localhost:${this.config.PORT}`
            )
            console.log(
                `API docs are available at:\n - http://localhost:${this.config.PORT}/api-docs\n - http://localhost:${this.config.PORT}/api-docs/json`
            )
        })
    }
}

export default App
