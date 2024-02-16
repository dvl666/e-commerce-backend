import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/signin.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';

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
  
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(
      @Req() req
  ) {
    return req.user;
  }
}
