import swaggerJsdoc from "swagger-jsdoc"
// TODO: turn to json
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
                url: "http://localhost:3000/api",
                description: "Local server",
            },
        ],
        components: {
            schemas: {
                Product: {
                    type: "object",
                    required: ["name", "description", "price", "categoryId"],
                    properties: {
                        id: {
                            type: "string",
                            description: "The auto-generated ID of the product",
                        },
                        name: {
                            type: "string",
                            minLength: 3,
                            maxLength: 100,
                            description: "The name of the product",
                        },
                        description: {
                            type: "string",
                            minLength: 10,
                            maxLength: 500,
                            description: "The description of the product",
                        },
                        price: {
                            type: "number",
                            format: "float",
                            minimum: 0.01,
                            description: "The price of the product",
                        },
                        categoryId: {
                            type: "string",
                            description:
                                "The ID of the category this product belongs to",
                        },
                    },
                    example: {
                        name: "Smartphone",
                        description:
                            "A high-end smartphone with advanced features.",
                        price: 999.99,
                        categoryId: "210c57d0-e8d5-47f5-b67b-4376eb074eb3",
                    },
                },
                Category: {
                    type: "object",
                    required: ["name", "description"],
                    properties: {
                        id: {
                            type: "string",
                            description:
                                "The auto-generated ID of the category",
                        },
                        name: {
                            type: "string",
                            minLength: 3,
                            maxLength: 100,
                            description: "The name of the category",
                        },
                        description: {
                            type: "string",
                            minLength: 10,
                            maxLength: 500,
                            description: "The description of the category",
                        },
                        created_at: {
                            type: "string",
                            format: "date-time",
                            description:
                                "The timestamp when the category was created",
                        },
                        updated_at: {
                            type: "string",
                            format: "date-time",
                            description:
                                "The timestamp when the category was last updated",
                        },
                    },
                    example: {
                        id: "210c57d0-e8d5-47f5-b67b-4376eb074eb3",
                        name: "Electronics",
                        description: "All electronic products",
                        created_at: "2025-03-10T08:00:00.000Z",
                        updated_at: "2025-03-10T08:00:00.000Z",
                    },
                },
                Pagination: {
                    type: "object",
                    properties: {
                        page: {
                            type: "integer",
                            minimum: 1,
                            default: 1,
                            description: "The page number to retrieve",
                        },
                        pageSize: {
                            type: "integer",
                            enum: [10, 20, 30],
                            default: 10,
                            description: "The number of items per page",
                        },
                    },
                    example: {
                        page: 1,
                        pageSize: 10,
                    },
                },
            },
        },
    },
    apis: ["./src/**/*.ts"],
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
