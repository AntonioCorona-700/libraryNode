import { DeleteResult, getRepository, Repository } from "typeorm";
import { User } from "../models/users";

export default class UserRepository {
  private repository_: Repository<User>;
  constructor() {}

  private get repository(): Repository<User> {
    if (!this.repository_) {
      this.repository_ = getRepository(User);
    }
    return this.repository_;
  }

  async CreateUser(
    name: string,
    password: string
  ): Promise<User> {
    let user = new User();
    user.name = name;
    user.password = password;

    return await this.repository.save(user);
  }

  async getUser(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

}
