import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(email: string, name: string, wallet: string, privyId: string) {
    //Create user entry or fetch existing
    const user = await this.userService.findOrCreateUser(
      email,
      name,
      wallet,
      privyId,
    );
    return { message: 'Login successful', user };
  }

  async generateApiKey(email: string) {
    const user = await this.userService.findUserByEmail(email);
    const payload = { ...user };
    const apiKey = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET') as string,
    });

    await this.userService.updateUser(user.email, { apiKey });

    return { message: 'API Key successfully generated', apiKey };
  }
}
