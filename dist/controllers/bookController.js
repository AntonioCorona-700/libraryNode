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
exports.BookController = void 0;
const express_1 = require("express");
const bookRepository_1 = __importDefault(require("../repositories/bookRepository"));
class BookController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.get("/", this.getAll);
        this.router.get("/", (req, res) => this.getAll(req, res));
        this.router.get("/:id", (req, res) => this.get(req, res));
        this.router.post("/", (req, res) => this.create(req, res));
        this.router.patch("/:id", (req, res) => this.update(req, res));
        this.router.delete("/:id", (req, res) => this.delete(req, res));
        this.repository = new bookRepository_1.default();
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req["user"]);
            const books = yield this.repository.getAllBooks();
            res.status(200).json(books);
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const p = yield this.repository.getBook(id);
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
            if (p.title) {
                //TODO VaLidate procut properties
                const newBook = yield this.repository.createBook(p.title, p.pages, p.author);
                res.status(201).json(newBook);
            }
            else {
                res.status(400).json({ error: "Error, name cannot be empty" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const p = req.body;
            if (id) {
                const book = yield this.repository.updateBook(id, p.title, p.pages, p.author);
                res.status(200).json(book);
            }
            else {
                res.status(400).json({ error: "Error, name or id cannot be empty" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                yield this.repository.deleteBook(id);
                res.status(200).json({ message: "Book Deleted" });
            }
            catch (ex) {
                res.status(400).json({ error: "Imppossible to delete" });
            }
        });
    }
}
exports.BookController = BookController;
