import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SingInDto } from './dto/signin.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService
    ) {}

    async signIn({ email, password }: SingInDto ) {
        const user = await this.usersService.findOneByEmailWithPassword(email);
        const isValidPassword = await bcryptjs.compare(password, user.password)
        if(!isValidPassword) throw new UnauthorizedException('Password is wrong')
        // if(user.password !== password) throw new BadRequestException('password is wrong')
        return {
            user
        }   
    }

    async register({ username, email, password }: RegisterDto) {
        await this.usersService.findOneByEmail(email)
        await this.usersService.create({
            username,
            email,
            password: await bcryptjs.hash(password, 10)
        })
        return {
            username,
            email
        }
    }

}
