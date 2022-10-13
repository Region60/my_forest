import { ResponseUserDto } from './dto/response-user.dto';
import { Role } from "./../roles/role.enum"
  import { Inject, Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { User } from "./entities/user.entity"
import * as bcrypt from "bcrypt"
//import { MailService } from "src/mail/mail.service"

@Injectable()
export class UsersService {
  constructor(
    // @Inject("USERS_REPOSITORY")
    // private userRepository: Repository<User>,
    // //private mailServise: MailService
  ) {}

  private generateString(): string {
    const abc = "abcdefghijklmnopqrstuvwxyz0123456789"
    let randomString = ""
    while (randomString.length < 10) {
      randomString += abc[Math.floor(Math.random() * abc.length)]
    }
    return randomString
  }

  async create(createUserDto: CreateUserDto) {
    // const candidate = await this.userRepository.findBy({
    //   email: createUserDto.email,
    // })
    const candidate = []

    if (!candidate[0]) {
      const randomString = this.generateString()
      const { password } = createUserDto
      const hashPassword: string = await bcrypt.hash(password, 10)
      createUserDto.password = hashPassword
      createUserDto.confirmRegister = randomString
      // this.mailServise.sendMessageReg(
      //   createUserDto.email,
      //   randomString,
      //   createUserDto.name
      // )
    //   const response = await this.userRepository.insert(createUserDto)
    //   if (response.generatedMaps.length)
    //     return "The record has been successfully created."
    // } else {
    //   return `a user with ${createUserDto.email} already exists`
    // }
    return "The record has been successfully created."
  }}

  // async findAll(): Promise<ResponseUserDto[]>{
  //   return await this.userRepository.find({
  //     select: {
  //       id: true,
  //       name: true,
  //       registerDate: true,
  //       phone: true,
  //       email: true,
  //       roles: true,
  //     },
      
  //   })
  // }

  async findAll(){
      return "find All"
    }

  async findOneById(id: number) {
    //const{password, ...user} = await this.userRepository.findOneBy({id })
    return 'findOneById'
  }

  // async findOneByEmail(email: string) {
  //   return await this.userRepository.findOneBy({ email })
  // }

  async update(id: number, updateUserDto: UpdateUserDto) {
    //return await this.userRepository.update(id, { ...updateUserDto })
    return 'update'
  }

  async updatePass(id: number, password: string) {
    const hashPassword: string = await bcrypt.hash(password, 10)
    //return await this.userRepository.update(id, { password: hashPassword })
    return 'updatepass'
  }

  async remove(id: number) {
    //return await this.userRepository.delete(id)
    return 'remove'
  }

  // async confirmReg(email: string, unicString: string) {
  //   const { id } = await this.userRepository.findOneBy({ email })
  //   return await this.userRepository.update(id, { confirmRegister: unicString })
  // }

  async changeRole(id: string, role: Role) {
    console.log(id)
    console.log(role)
    //return await this.userRepository.update(+id, { roles: role })
    return 'change role'
  }

  async confirmEmail(confirmRegister: string) {
    // const { id } = await this.userRepository.findOneBy({ confirmRegister })
    // return await this.userRepository.update(id, { roles: Role.User })
    return 'confirm email'
  }
}
