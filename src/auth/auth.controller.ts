import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('confirm')
  async confirmReg(@Body() body){
    return await this.authService.login(body.email)
  }
}
