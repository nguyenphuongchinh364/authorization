require("dotenv").config();
require("./src/config/database").connect();
const express = require("express");
const app = express();
// Middleware
app.use(express.json({ limit: "50mb" }));
// Routes
const userRoutes = require("./src/routers/user");
const authRoutes = require("./src/routers/auth");
const bookRoutes = require("./src/routers/book")
const roleRoutes = require("./src/routers/role")

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/book", bookRoutes);
app.use("/role", roleRoutes)


const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Your API Documentation",
            version: "1.0.0",
            description: "Documentation for your API",
        },
    },
    apis: ["./src/routers/*.js"], // Đường dẫn tới các file mô tả API
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Route cuối cùng xử lý khi không tìm thấy
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
