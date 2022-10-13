import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  OneToMany,
} from "typeorm"
//import { Project } from "src/project/entities/project.entity"
import { Role } from "../../roles/role.enum"

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  name: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  password: string

  @Column({ default: "unconfirmed" })
  roles: Role

  @CreateDateColumn()
  registerDate: Date

  @Column({ default: null })
  confirmRegister: string

  // @OneToMany(() => Project, (project) => project.user)
  // project: Project[]
}
