import { MailModule } from '../mail/mail.module';
import { userProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesGuard } from 'src/roles/role.guard';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [UsersController],
  providers: [...userProviders, UsersService, RolesGuard ],
  exports: [UsersService],
})
export class UsersModule {}
