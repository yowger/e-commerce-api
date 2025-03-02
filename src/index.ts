import "dotenv/config"
import "module-alias/register"

import App from "@/lib/App/App"
import { config } from "@/lib/config"
import { defaultRoutes } from "@/lib/App/defaultRoutes"
import { authRouter } from "@/features/auth/pres/authRoutes"
import { productRouter } from "@/features/catalog/pres/routes/productRoutes"
import { errorHandler } from "@/lib/http/middleware/errorHandler"
import { notFoundHandler } from "@/lib/http/middleware/notFoundHandler"
import { SwaggerService } from "@/lib/swagger/SwaggerService"

const swaggerService = new SwaggerService()
const app = new App(swaggerService, config)

app.configureDefaultMiddleware()
app.setUpMorgan()
if (config.ENV === "development") app.setUpSwaggerDocs()
app.setUpAuth()
app.registerRoutes("/api/v1/products", productRouter)
app.registerRoutes("/api/v1/auth", authRouter)
app.registerRoutes("/api", defaultRoutes)
app.registerMiddleware(notFoundHandler)
app.registerMiddleware(errorHandler)

app.start()
