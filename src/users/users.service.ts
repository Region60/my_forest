import { ResponseUserDto } from './dto/response-user.dto';
import { Role } from '../roles/role.enum';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<User>,
    private mailServise: MailService,
  ) {}

  private generateString(): string {
    const abc = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    while (randomString.length < 10) {
      randomString += abc[Math.floor(Math.random() * abc.length)];
    }
    return randomString;
  }

  async create(createUserDto: CreateUserDto) {
    const candidate = await this.userRepository.findBy({
      email: createUserDto.email,
    });
    if (!candidate[0]) {
      const randomString = this.generateString();
      const { userPassword } = createUserDto;
      const hashPassword: string = await bcrypt.hash(userPassword, 10);
      createUserDto.userPassword = hashPassword;
      createUserDto.confirmRegister = randomString;
      this.mailServise.sendMessageReg(
        createUserDto.email,
        randomString,
        createUserDto.userName,
      );
      const response = await this.userRepository.insert(createUserDto);
      if (response.generatedMaps.length)
        return 'The record has been successfully created.';
    } else {
      return `a user with ${createUserDto.email} already exists`;
    }
    return 'The record has been successfully created.';
  }

  async findAll(): Promise<ResponseUserDto[]> {
    return await this.userRepository.find({
      select: {
        id: true,
        userName: true,
        registerDate: true,
        phone: true,
        email: true,
        roles: true,
      },
    });
  }

  async findOneById(id: number) {
    const { userPassword, ...user } = await this.userRepository.findOneBy({
      id,
    });
    return user;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async confirmRegister(confirmRegister: string) {
    return await this.userRepository.update(
      { confirmRegister },
      { roles: Role.User },
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, { ...updateUserDto });
  }

  async updatePass(id: number, password: string) {
    const hashPassword: string = await bcrypt.hash(password, 10);
    return await this.userRepository.update(id, { userPassword: hashPassword });
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async confirmReg(email: string, unicString: string) {
    const { id } = await this.userRepository.findOneBy({ email });
    return await this.userRepository.update(id, {
      confirmRegister: unicString,
    });
  }

  async changeRole(id: string, role: Role) {
    return await this.userRepository.update(+id, { roles: role });
  }

  async confirmEmail(confirmRegister: string) {
    const { id } = await this.userRepository.findOneBy({ confirmRegister });
    return await this.userRepository.update(id, { roles: Role.User });
  }
}
