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

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);




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
