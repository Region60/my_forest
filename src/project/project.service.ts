import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @Inject('PROJECT_REPOSYTORY')
        private projectRepository: Repository<Project>
    ){}

    async create(createProjectDto: CreateProjectDto,id: number){
        const response = await  this.projectRepository.insert({...createProjectDto, creatorId: id})
        console.log(response)
        return response
    }

    async delete(id: number) {
        return await this.projectRepository.delete({id})
    }

    async update(updateProjectDto: UpdateProjectDto, projectId: number){
        return await this.projectRepository.update(projectId,{...updateProjectDto})
    }
}
