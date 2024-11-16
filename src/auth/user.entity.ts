import { Expose, Transform } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./roles.enum";

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
  @Transform(({ value }) => value.toUpperCase()) 
  email: string;

  @Expose()
  @Column()
  firstName: string;

  @Expose()
  @Column()
  lastName: string;


  @Column({ default: Role.User }) 
  role: Role;

}