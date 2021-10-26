import { Request, Response, Router } from "express";
import { Book } from "../models/book";
import BookRepository from "../repositories/bookRepository";

export class BookController{
    public router: Router;
    private repository: BookRepository;

    constructor(){
        this.router=Router();
        this.router.get("/",this.getAll);
        this.router.get("/", (req, res) => this.getAll(req, res));
        this.router.get("/:id", (req, res) => this.get(req, res));
        this.router.post("/", (req, res) => this.create(req, res));
        this.router.patch("/:id", (req, res) => this.update(req, res));
        this.router.delete("/:id", (req, res) => this.delete(req, res));

        this.repository=new BookRepository();
    }
    private async getAll(req: Request, res: Response): Promise<void> {
        console.log(req["user"]);

        const books = await this.repository.getAllBooks();
    
        res.status(200).json(books);
      }

      private async get(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        if (id) {
          const p = await this.repository.getBook(id);
          if (p) res.status(200).json(p);
          else res.status(404).json({ message: "Not found" });
        } else {
          res.status(400).json({ message: "Bad request " });
        }
      }
    
      private async create(req: Request, res: Response): Promise<void> {
        const p: Book = req.body;
        if (p.title) {
          //TODO VaLidate procut properties
          const newBook: Book = await this.repository.createBook(
            p.title,
            p.pages,
            p.author
          );
          res.status(201).json(newBook);
        } else {
          res.status(400).json({ error: "Error, name cannot be empty" });
        }
      }
    
      private async update(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const p: Book = req.body;
    
        if (id) {
          const book = await this.repository.updateBook(
            id,
            p.title,
            p.pages,
            p.author
          );
          res.status(200).json(book);
        } else {
          res.status(400).json({ error: "Error, name or id cannot be empty" });
        }
      }
    
      private async delete(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        try {
          await this.repository.deleteBook(id);
          res.status(200).json({ message: "Book Deleted" });
        } catch (ex) {
          res.status(400).json({ error: "Imppossible to delete" });
        }
      }
      
}