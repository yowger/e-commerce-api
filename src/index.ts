import "module-alias/register"

import { productRouter } from "@/features/catalog/pres/routes/productRoutes"
import App from "@/shared/server/App"

const app = new App()

app.registerRoutes("/api/v1/catalog", productRouter)

const PORT = process.env.PORT || 3000
app.start(PORT)
