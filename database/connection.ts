import { Connection, createConnection } from "typeorm";
import { Author } from "../models/author";
import { Book } from "../models/book";
import { User } from "../models/users";


export class DatabaseConnection {
  public static connection: Connection = null;

  static async connect() {
    if (!this.connection) {
      try {
        this.connection = await createConnection({
          type: "mssql",
          host: "DESKTOP-32S08JA",//process.env.host,//"SCM-WS51",//DESKTOP-32S08JA//?????????
          port: parseInt(process.env.db_port),
          username: process.env.database_username,
          password: process.env.database_password,
          database: process.env.database,
          synchronize: false,
          logging: false,
          dropSchema: false,
          entities: [Author,Book,User],
          options: {
            enableArithAbort: true,
          },
        });
        console.log("Connection to DB success");
      } catch (ex) {
        console.log("Error db connection", ex);
      }
    }
    return this.connection;
  }
}
