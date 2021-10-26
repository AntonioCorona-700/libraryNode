import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nameAuthor: string;

  @Column()
  books: string[];

}


