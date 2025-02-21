import "module-alias/register"

import { productRouter } from "@/features/catalog/pres/routes/productRoutes"
import App from "@/shared/server/App"

const PORT = process.env.PORT || 3000

const app = new App()

app.configureDefaultMiddleware()
app.registerRoutes("/api/v1/catalog", productRouter)
app.configureDefaultRoutes()
app.configureNotFoundHandler()
app.configureErrorHandling()

app.start(PORT)
