import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Controller, Get, Request, Post, UseGuards, Body, Param } from '@nestjs/common';
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

  @Get('confirm/:confString')
  async confirmReg(@Param() param){
    return await this.authService.confirm(param.confString)
  }
}
