import cors from "cors"
import express, {
    Application,
    NextFunction,
    Response,
    Request,
    RequestHandler,
    Router,
} from "express"
import helmet from "helmet"
import morgan from "morgan"

class App {
    public express: Application

    constructor() {
        this.express = express()
    }

    public configureDefaultMiddleware(): void {
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: true }))
        this.express.use(morgan("combined"))
        this.express.use(helmet())
        this.express.use(cors())
    }

    public configureDefaultRoutes(): void {
        this.express.get("/health", (req: Request, res: Response) => {
            res.status(200).send({ status: "OK" })
        })
    }

    public configureErrorHandling(): void {
        this.express.use(
            (err: Error, req: Request, res: Response, next: NextFunction) => {
                console.error(err.stack)
                res.status(500).json({ error: "Something went wrong!" })
            }
        )
    }

    public configureNotFoundHandler(): void {
        this.express.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404).json({ error: "Route Not Found" })
        })
    }

    public registerMiddleware(middleware: RequestHandler): void {
        this.express.use(middleware)
    }

    public registerRoutes(prefix: string, router: Router): void {
        this.express.use(prefix, router)
    }

    public start(port: number | string): void {
        this.express.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`)
            // console.log(`Server running on http://localhost:${port}`)
        })
    }
}

export default App
