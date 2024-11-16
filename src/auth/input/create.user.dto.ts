import { IsEmail, IsIn, Length } from 'class-validator';
import { Role } from '../roles.enum';

export class CreateUserDto {
  @Length(5)
  username: string;

  @Length(8)
  password: string;

  @Length(8)
  retypedPassword: string;

  @Length(2)
  firstName: string;

  @Length(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsIn([Role.User, Role.Admin])
  role:  Role;
}
