import "module-alias/register"

import { productRouter } from "@/features/catalog/pres/routes/productRoutes"
import { container } from "@/shared/di"
import App from "@/shared/App/App"

const PORT = process.env.PORT || 3000

const app = container.get(App)

app.configureDefaultMiddleware()
app.configureSwaggerDocs()
app.registerRoutes("/api/v1/catalog", productRouter)
app.configureDefaultRoutes()
app.configureNotFoundHandler()
app.configureErrorHandling()

app.start(PORT)
