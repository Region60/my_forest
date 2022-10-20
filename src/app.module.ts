import { ProjectModule } from './project/project.module';
//import { ProjectModule } from "./project/project.module"
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProjectModule,
    MailModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
