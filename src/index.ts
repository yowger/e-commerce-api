import "module-alias/register"

import { productRouter } from "@/features/catalog/pres/routes/productRoutes"
import { container } from "@/shared/di"
import App from "@/App/App"
import defaultRoutes from "@/App/defaultRoutes"
import { Pool } from "pg"
import { notFoundHandler } from "@/shared/middleware/notFoundHandler"
import { errorHandler } from "@/shared/middleware/errorHandler"

const PORT = process.env.PORT || 3000

const app = container.get(App)

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
})

console.log("nice")

app.configureDefaultMiddleware()
app.configureSwaggerDocs()
app.registerRoutes("/api/v1/products", productRouter)
app.registerRoutes("/api", defaultRoutes)
app.registerMiddleware(notFoundHandler)
app.registerMiddleware(errorHandler)

app.start(PORT)
