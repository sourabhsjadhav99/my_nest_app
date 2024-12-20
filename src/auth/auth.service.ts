import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  public getTokenForUser(user: User): string {
    return this.jwtService.sign({
      email: user.email,
      sub: user.id,
      role: user.role
    });
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}