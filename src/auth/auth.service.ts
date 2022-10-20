import { JwtService } from "@nestjs/jwt"
import { Injectable, NotFoundException } from "@nestjs/common"
import { UsersService } from "src/users/users.service"
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email)
    if (!user) throw new NotFoundException()

    const isMatch = await bcrypt.compare(pass, user.userPassword)
    if (isMatch) {
      const { userPassword, ...result } = user
      return result
    }
    return null //оставить не удалять
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles }
    return {
      access_token: await this.jwtService.sign(payload),
    }
  }

  async confirmReg(email: string) {}
}
