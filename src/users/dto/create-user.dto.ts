import { IsEmail, IsMobilePhone,  IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';



export class CreateUserDto {
    @IsString()
    @ApiProperty()
    userName: string

    @IsEmail()
    @ApiProperty()
    email: string

    @IsString()
    @ApiProperty()
    userPassword: string    

    @IsMobilePhone()
    @ApiProperty()
    phone: string

    @IsString()
    @ApiProperty({required:false, default:''})
    confirmRegister?:string

    
}