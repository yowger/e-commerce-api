import express, { Application, RequestHandler, Router } from "express"

class App {
    public express: Application

    constructor() {
        this.express = express()
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
        })
    }
}

export default App
