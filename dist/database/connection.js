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
exports.DatabaseConnection = void 0;
const typeorm_1 = require("typeorm");
const author_1 = require("../models/author");
const book_1 = require("../models/book");
const users_1 = require("../models/users");
class DatabaseConnection {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                try {
                    this.connection = yield (0, typeorm_1.createConnection)({
                        type: "mssql",
                        host: "DESKTOP-32S08JA",
                        port: parseInt(process.env.db_port),
                        username: process.env.database_username,
                        password: process.env.database_password,
                        database: process.env.database,
                        synchronize: false,
                        logging: false,
                        dropSchema: false,
                        entities: [author_1.Author, book_1.Book, users_1.User],
                        options: {
                            enableArithAbort: true,
                        },
                    });
                    console.log("Connection to DB success");
                }
                catch (ex) {
                    console.log("Error db connection", ex);
                }
            }
            return this.connection;
        });
    }
}
exports.DatabaseConnection = DatabaseConnection;
DatabaseConnection.connection = null;
