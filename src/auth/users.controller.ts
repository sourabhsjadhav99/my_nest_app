import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./input/create.user.dto";
import { User } from "./user.entity";
import { Role } from "./roles.enum";

@Controller('api/user')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = new User();

    if (createUserDto.password !== createUserDto.retypedPassword) {
      throw new BadRequestException(['Passwords are not identical']);
    }

    const existingUser = await this.userRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email }
      ]
    });

    if (existingUser) {
      throw new BadRequestException(['username or email is already taken']);
    }

    user.username = createUserDto.username;
    user.password = await this.authService.hashPassword(createUserDto.password);
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.role = createUserDto.role

    return {
      ...(await this.userRepository.save(user)),
      token: this.authService.getTokenForUser(user)
    }
  }
}