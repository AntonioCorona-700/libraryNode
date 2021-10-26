import dotenv from 'dotenv';
import express, {Request,Response} from 'express';
import { BookController } from './controllers/bookController';
import { UsersController } from "./controllers/usersController";
import { Middleware } from "./utils/middleware";
import { DatabaseConnection } from "./database/connection";


dotenv.config();
DatabaseConnection.connect();

const port=process.env.PORT || 1234;
const app=express();
app.use (express.json());
app.get('/api',(req:Request,res: Response)=>{
    res.status(200).json({message: 'API is running OK'});
});
app.use("/api", new UsersController().router);
app.use(
    "/api/books",
    Middleware.authenticateJWT,//antes de ejecurar lo da abajo valida que seas usuario
    new BookController().router
  );
app.use("/api/books",new BookController().router);
app.listen(port,()=>{
console.log("App is running")
})