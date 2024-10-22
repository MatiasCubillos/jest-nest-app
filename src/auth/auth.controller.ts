import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from './guards/roles/roles.guard';
import { Role } from 'src/interfaces/role-enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get('validateAdm')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  validate(
    @Request()
    req: RequestWithUser,
  ) {
    return req.user;
  }
  
  @Get('validateUsr')
  @Roles(Role.USER)
  @UseGuards(AuthGuard, RolesGuard)
  validateUsr(
    @Request()
    req: RequestWithUser,
  ) {
    return req.user;
  }
}
