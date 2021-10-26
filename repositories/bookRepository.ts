import { DeleteResult, getRepository, Repository } from "typeorm";
import { Book } from "../models/book";

export default class BookRepository {
  private repository_: Repository<Book>;
  constructor() {}

  private get repository(): Repository<Book> {
    if (!this.repository_) {
      this.repository_ = getRepository(Book);
    }
    return this.repository_;
  }

  async createBook(
    title: string,
    pages: number,
    author: string
  ): Promise<Book> {
    let book = new Book();
    book.title = title;
    book.pages = pages;
    book.author = author;

    return await this.repository.save(book);
  }

  async getBook(id: string): Promise<Book> {
    return await this.repository.findOne(id);
  }

  async deleteBook(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async updateBook(
    id: string,
    title: string,
    pages: number,
    author: string
  ): Promise<Book> {
    let BookOld = await this.repository.findOne(id);
    BookOld.title = title;
    BookOld.pages = pages;
    BookOld.author = author;
    return await this.repository.save(BookOld);
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.repository.find();
  }
}
