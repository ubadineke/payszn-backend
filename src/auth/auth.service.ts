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
