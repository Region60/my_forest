import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ProjectService } from './project.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    return this.projectService.create(createProjectDto, req.user.userId);
  }

  @Patch(':id')
  updateProject(@Body() updateProjectDto: UpdateProjectDto, @Param() param) {
    return this.projectService.update(updateProjectDto, +param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.delete(+id);
  }
}
