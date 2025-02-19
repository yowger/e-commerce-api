import 'module-alias/register'
import App from "@/shared/server/app"

const app = new App()

// app.registerRoutes("/api/catalog", )

const PORT = process.env.PORT || 3000
app.start(PORT)
