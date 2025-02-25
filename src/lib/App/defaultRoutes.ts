import { Router, Request, Response } from "express"

const defaultRoutes = Router()

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check the health of the API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 */
defaultRoutes.get("/health", (req: Request, res: Response) => {
    res.status(200).send({ status: "OK" })
})

export default defaultRoutes
