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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const book_1 = require("../models/book");
class BookRepository {
    constructor() { }
    get repository() {
        if (!this.repository_) {
            this.repository_ = (0, typeorm_1.getRepository)(book_1.Book);
        }
        return this.repository_;
    }
    createBook(title, pages, author) {
        return __awaiter(this, void 0, void 0, function* () {
            let book = new book_1.Book();
            book.title = title;
            book.pages = pages;
            book.author = author;
            return yield this.repository.save(book);
        });
    }
    getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne(id);
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.delete(id);
        });
    }
    updateBook(id, title, pages, author) {
        return __awaiter(this, void 0, void 0, function* () {
            let BookOld = yield this.repository.findOne(id);
            BookOld.title = title;
            BookOld.pages = pages;
            BookOld.author = author;
            return yield this.repository.save(BookOld);
        });
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
}
exports.default = BookRepository;
