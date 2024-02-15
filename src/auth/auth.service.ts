import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SingInDto } from './dto/signin.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService
    ) {}

    async signIn({ email, password }: SingInDto ) {
        const user = await this.usersService.findOneByEmailWithPassword(email);
        // if(!user) throw new BadRequestException('Email is not registered')
        if(user.password !== password) throw new BadRequestException('password is wrong')
        return user
    }

    async register(user: RegisterDto) {
        await this.usersService.findOneByEmail(user.email)
        await this.usersService.create(user)
        return 'User created'
    }

}
