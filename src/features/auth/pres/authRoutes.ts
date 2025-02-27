import { Request, Response, Router } from "express"

const authRouter = Router()

authRouter.get("/", (req: Request, res: Response) => {
    console.log("oidc", req.oidc.isAuthenticated())
    res.send(req.oidc?.isAuthenticated() ? "Logged in" : "Logged out")
})

export { authRouter }
