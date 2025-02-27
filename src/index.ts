import "dotenv/config"
import "module-alias/register"
import { Pool } from "pg"

import App from "@/lib/App/App"
import { config } from "@/lib/config"
import defaultRoutes from "@/lib/App/defaultRoutes"
import { productRouter } from "@/features/catalog/pres/routes/productRoutes"
import { errorHandler } from "@/lib/http/middleware/errorHandler"
import { notFoundHandler } from "@/lib/http/middleware/notFoundHandler"
import { SwaggerService } from "@/lib/swagger/SwaggerService"

const swaggerService = new SwaggerService()
const app = new App(swaggerService, config)

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: parseInt(process.env.DB_PORT),
// })

app.configureDefaultMiddleware()
if (process.env.NODE_ENV === "development") app.setUpSwaggerDocs()
app.setUpAuth()
app.registerRoutes("/api/v1/products", productRouter)
app.registerRoutes("/api", defaultRoutes)
app.registerMiddleware(notFoundHandler)
app.registerMiddleware(errorHandler)

app.start()
