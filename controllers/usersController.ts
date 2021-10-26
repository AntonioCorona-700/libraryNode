import { Request, Response, Router } from "express";
import { User } from "../models/users";
import UserRepository from "../repositories/userRepository";

import JWT from "jsonwebtoken";

export class UsersController {
  public router: Router;
  private repository: UserRepository;

  constructor() {
    this.router = Router();
    this.router.post("/login", this.login);
    this.router.post('/user', this.create);
  }

  private async login(req: Request, res: Response) {
    const { user, password } = req.body;

    if (user === "cestrada" && password === "a11111") {
      const token = JWT.sign(
        { user: "cestrada", role: "admin" },
       process.env.secret
      );
      res.status(200).json({ token });
    } else {
      res.status(404).json({ message: "User or password does not exists." });
    }
  }



  private async get(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    if (id) {
      const p = await this.repository.getUser(id);
      if (p) res.status(200).json(p);
      else res.status(404).json({ message: "Not found" });
    } else {
      res.status(400).json({ message: "Bad request " });
    }
  }
  private async create(req: Request, res: Response): Promise<void> {
    const p: User = req.body;
    if (p.name) {
      //TODO VaLidate procut properties
      const newBook: User = await this.repository.CreateUser(
        p.name,
        p.password
      );
      res.status(201).json(newBook);
    } else {
      res.status(400).json({ error: "Error, name cannot be empty" });
    }
  }
}