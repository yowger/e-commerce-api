import { Request, Response } from "express"
import App from "./server/app"

const app = new App().express

app.get("/", (req: Request, res: Response) => {
    res.send("test")
})

app.listen(3000, () => {
    console.log(`[server]: Server is running at port ${3000}`)
})
