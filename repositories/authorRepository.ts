import { DeleteResult, getRepository, Repository } from "typeorm";
import { Author } from "../models/author";

export default class AuthorRepository {
  private repository_: Repository<Author>;
  constructor() {}

  private get repository(): Repository<Author> {
    if (!this.repository_) {
      this.repository_ = getRepository(Author);
    }
    return this.repository_;
  }

  async createAuthor(
    nameAuthor: string,
    books: string[]
  ): Promise<Author> {
    let author = new Author();
    author.nameAuthor = nameAuthor;
    author.books = books;

    return await this.repository.save(author);
  }

  async getAuthor(id: string): Promise<Author> {
    return await this.repository.findOne(id);
  }

  async deleteAuthor(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async updateAuthor(
    id: string,
    nameAuthor: string,
    books: string[]
  ): Promise<Author> {
    let AuthorOld = await this.repository.findOne(id);
   AuthorOld.nameAuthor = nameAuthor;
   AuthorOld.books = books;
    return await this.repository.save(AuthorOld);
  }

  async getAllAuthors(): Promise<Author[]> {
    return await this.repository.find();
  }
}
