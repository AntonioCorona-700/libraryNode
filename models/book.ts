import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  pages: number;

  @Column()
  author: string;
}


