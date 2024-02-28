import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/signin.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from 'src/common/enums/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active.user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user.active.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiBearerAuth()
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
  
  // @Get('profile')
  // @Auth(Role.ADMIN)
  // getProfile(
  //     @ActiveUser() user: UserActiveInterface
  // ) {
  //   return this.authService.getProfile(user);
  // }
  
}
