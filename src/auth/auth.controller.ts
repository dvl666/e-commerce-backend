import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/signin.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('signIn')
  signIn(
    @Body() signInDto: SingInDto
  ) {
    return this.authService.signIn(signInDto);
  }

  @Post('register')
  register(
    @Body() registerDto: RegisterDto
  ) {
    return this.authService.register(registerDto)
  }
  
}
