import { DatabaseModule } from '../database/database.module'
import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { projectProviders } from './project.providers';
import { ProjectService } from './project.service';

@Module({
  imports: [DatabaseModule,],
  controllers: [ProjectController],
  providers: [...projectProviders, ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {}
