"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UsersController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.post("/login", this.login);
        this.router.post('/user', this.create);
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, password } = req.body;
            if (user === "cestrada" && password === "a11111") {
                const token = jsonwebtoken_1.default.sign({ user: "cestrada", role: "admin" }, process.env.secret);
                res.status(200).json({ token });
            }
            else {
                res.status(404).json({ message: "User or password does not exists." });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const p = yield this.repository.getUser(id);
                if (p)
                    res.status(200).json(p);
                else
                    res.status(404).json({ message: "Not found" });
            }
            else {
                res.status(400).json({ message: "Bad request " });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = req.body;
            if (p.name) {
                //TODO VaLidate procut properties
                const newBook = yield this.repository.CreateUser(p.name, p.password);
                res.status(201).json(newBook);
            }
            else {
                res.status(400).json({ error: "Error, name cannot be empty" });
            }
        });
    }
}
exports.UsersController = UsersController;
