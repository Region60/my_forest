import { IsEmail, IsMobilePhone,  IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';



export class CreateUserDto {
    @IsString()
    @ApiProperty()
    name: string

    @IsEmail()
    @ApiProperty()
    email: string

    @IsString()
    @ApiProperty()
    password: string    

    @IsMobilePhone()
    @ApiProperty()
    phone: string

    @IsString()
    @ApiProperty({required:false, default:''})
    confirmRegister?:string

    
}