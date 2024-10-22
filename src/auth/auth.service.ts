import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, email, password, rut }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email); // email proviene de los parametros de la funcion

    if (user) {
      throw new BadRequestException('user exists');
    }

    return await this.usersService.create({
      name,
      email,
      password: await bcryptjs.hash(password, 10),
      rut,
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException('Correo o contraseña inválidos');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Correo o contraseña inválido');
    }

    const payload = { email: user.email, role: user.role_id };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      message: 'Token propiedad de: ' + email,
    };
  }
}
