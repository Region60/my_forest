import { PricePlan } from './pricePlan';
import { User } from '../../users/entities/user.entity'
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn()
    id:number

    @CreateDateColumn()
    createDate: Date

    @Column()
    creatorId: number

    @Column()
    title: string

    @Column()
    photo: string

    @Column({
        type: 'enum',
        enum: PricePlan,
        default: PricePlan.INITIAL,
    })
    pricePlan: PricePlan

    @Column({default:0})
    rating: number

    @ManyToMany(() => User, (user)=>user.projects)
    users: User[];

}