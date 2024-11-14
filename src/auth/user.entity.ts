import { Expose } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Expose()
  @Column({ unique: true })
  email: string;

  @Expose()
  @Column()
  firstName: string;

  @Expose()
  @Column()
  lastName: string;

}