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
const users_1 = require("../models/users");
class UserRepository {
    constructor() { }
    get repository() {
        if (!this.repository_) {
            this.repository_ = (0, typeorm_1.getRepository)(users_1.User);
        }
        return this.repository_;
    }
    CreateUser(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new users_1.User();
            user.name = name;
            user.password = password;
            return yield this.repository.save(user);
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne(id);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.delete(id);
        });
    }
}
exports.default = UserRepository;
