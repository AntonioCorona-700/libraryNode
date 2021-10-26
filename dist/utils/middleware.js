"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Middleware {
    static authenticateJWT(req, res, next) {
        const header = req.headers.authorization;
        if (header) {
            try {
                const token = header.split(" ")[1];
                let user = jsonwebtoken_1.default.verify(token, process.env.secret);
                req["user"] = user;
                next();
            }
            catch (err) {
                console.log(err);
                res.status(404).json({ message: "You are not authenticated" });
            }
        }
        else {
            res.status(404).json({ message: "You are not authenticated" });
        }
    }
}
exports.Middleware = Middleware;
