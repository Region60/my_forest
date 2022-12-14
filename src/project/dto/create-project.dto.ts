import { User } from './../../users/entities/user.entity';
import { IsArray, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class CreateProjectDto {
    @IsString()
    @ApiProperty()
    title:string
 
    @IsNumber()
    @ApiProperty()
    price: number

    @IsString()
    @ApiProperty()
    text: string

    @IsString()
    @ApiProperty()
    photo: string

    @IsArray()
    @ApiProperty()
    users:[User]
}