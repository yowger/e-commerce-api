import express, { Application } from "express"
import morgan from "morgan"

class App {
    public express: Application

    constructor() {
        this.express = express()
        this.configureMiddleware()
        this.configureRoutes()
    }

    private configureMiddleware(): void {
        this.express.use(express.json())
        this.express.use(morgan("combined"))
    }

    private configureRoutes(): void {}
}

export default App
