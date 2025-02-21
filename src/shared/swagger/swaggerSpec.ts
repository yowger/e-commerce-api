import swaggerJsdoc from "swagger-jsdoc"

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-Commerce API",
            version: "1.0.0",
            description: "API documentation for E-commerce API",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server",
            },
        ],
        components: {
            schemas: {
                Product: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            example: "1",
                        },
                        name: {
                            type: "string",
                            example: "Laptop",
                        },
                        description: {
                            type: "string",
                            example: "A high-performance laptop",
                        },
                        price: {
                            type: "number",
                            example: 1200,
                        },
                        categoryId: {
                            type: "string",
                            example: "electronics",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/**/*.ts"],
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
