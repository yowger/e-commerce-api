import "dotenv/config"
import "module-alias/register"
import { Pool } from "pg"

import App from "@/App/App"
import defaultRoutes from "@/App/defaultRoutes"
import { productRouter } from "@/features/catalog/pres/routes/productRoutes"
import { errorHandler } from "@/shared/middleware/errorHandler"
import { notFoundHandler } from "@/shared/middleware/notFoundHandler"
import { SwaggerService } from "@/shared/swagger/SwaggerService"

const PORT = process.env.PORT || 3000

const swaggerService = new SwaggerService()
const app = new App(swaggerService)

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
})

app.configureDefaultMiddleware()

if (process.env.NODE_ENV === "development") {
    app.setUpSwaggerDocs()
}

app.registerRoutes("/api/v1/products", productRouter)
app.registerRoutes("/api", defaultRoutes)
app.registerMiddleware(notFoundHandler)
app.registerMiddleware(errorHandler)

app.start(PORT)
