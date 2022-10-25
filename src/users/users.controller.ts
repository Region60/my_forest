import { ResponseUserDto } from './dto/response-user.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/roles/role.decorator';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/roles/role.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    return await this.usersService.findOneById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(req.user.userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updatepass')
  async updatePass(@Req() req: any, @Body() body) {
    return await this.usersService.updatePass(req.user.userId, body.password);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }

  @Roles(Role.RootUser)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('changerole/:id/:role')
  async changeRole(@Param('id') id: string, @Param('role') role: Role) {
    return await this.usersService.changeRole(id, role);
  }

  @UseGuards(JwtAuthGuard)
  @Get('confirmEmail/:uniqValue')
  async confirmEmail(@Param('uniqValue') uniqValue: string) {
    return await this.usersService.confirmEmail(uniqValue);
  }
}
