import { DataSource } from "typeorm";
import {Project} from './entities/project.entity'

export const projectProviders = [
    {
        provide: 'PROJECT_REPOSYTORY',
        useFactory: (dataSource: DataSource)=> dataSource.getRepository(Project),
        inject: ['DATA_SOURCE']
    }
]