import { Role } from '../../roles/role.enum';
import { ApiProperty, OmitType } from "@nestjs/swagger"
import { IsEnum, IsNumber, IsString } from "class-validator"
import { CreateUserDto } from "./create-user.dto"

export class ResponseUserDto extends OmitType (CreateUserDto,['userPassword','confirmRegister']) {
    @IsNumber()
    @ApiProperty()
    id: number

    @IsEnum(Role)
    @ApiProperty({enum:['user', 'admin', 'root','unconfirmed']})
    roles: Role
}