"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const bookController_1 = require("./controllers/bookController");
const usersController_1 = require("./controllers/usersController");
const middleware_1 = require("./utils/middleware");
const connection_1 = require("./database/connection");
dotenv_1.default.config();
connection_1.DatabaseConnection.connect();
const port = process.env.PORT || 1234;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/api', (req, res) => {
    res.status(200).json({ message: 'API is running OK' });
});
app.use("/api", new usersController_1.UsersController().router);
app.use("/api/books", middleware_1.Middleware.authenticateJWT, //antes de ejecurar lo da abajo valida que seas usuario
new bookController_1.BookController().router);
app.use("/api/books", new bookController_1.BookController().router);
app.listen(port, () => {
    console.log("App is running");
});
