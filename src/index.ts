import express from "express"
import morgan from "morgan"

import App from "./shared/server/app"

const app = new App()

app.registerMiddleware(express.json())
app.registerMiddleware(morgan("combined"))

// app.registerRoutes("/api/catalog", )

const PORT = process.env.PORT || 3000
app.start(PORT)
