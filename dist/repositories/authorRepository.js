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
const author_1 = require("../models/author");
class AuthorRepository {
    constructor() { }
    get repository() {
        if (!this.repository_) {
            this.repository_ = (0, typeorm_1.getRepository)(author_1.Author);
        }
        return this.repository_;
    }
    createAuthor(nameAuthor, books) {
        return __awaiter(this, void 0, void 0, function* () {
            let author = new author_1.Author();
            author.nameAuthor = nameAuthor;
            author.books = books;
            return yield this.repository.save(author);
        });
    }
    getAuthor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne(id);
        });
    }
    deleteAuthor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.delete(id);
        });
    }
    updateAuthor(id, nameAuthor, books) {
        return __awaiter(this, void 0, void 0, function* () {
            let AuthorOld = yield this.repository.findOne(id);
            AuthorOld.nameAuthor = nameAuthor;
            AuthorOld.books = books;
            return yield this.repository.save(AuthorOld);
        });
    }
    getAllAuthors() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
}
exports.default = AuthorRepository;
