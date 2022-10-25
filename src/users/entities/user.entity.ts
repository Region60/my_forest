import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Role } from '../../roles/role.enum';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  userName  : string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  userPassword: string;

  @Column({ default: 'unconfirmed' })
  roles: Role;

  @CreateDateColumn()
  registerDate: Date;

  @Column({ default: null })
  confirmRegister: string;

  @ManyToMany(() => Project, (project)=>project.users)
  @JoinTable()
  projects: Project[];
}
