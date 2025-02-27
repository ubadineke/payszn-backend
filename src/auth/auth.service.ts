import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomUUID, UUID } from 'crypto';
import { ApiKeyService } from 'src/api-key/api-key.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly apiKeyService: ApiKeyService,
  ) {}

  async generateApiKey(email: string) {
    const user = await this.userService.findUserByEmail(email);

    console.log('My user', user);

    if (!user.webhookUrl && !user.callbackUrl) {
      return;
    }
    const payload = { ...user };

    //Create JWT
    const apiKeyJwt = await this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET') as string,
    });
    console.log('jwtapikey', apiKeyJwt);
    //Create Api Key to Map
    const apiKey = `api_${randomUUID()}`;
    console.log(apiKey);

    //Store key in the api-key entity
    await this.apiKeyService.createApiTokenEntry(apiKeyJwt, apiKey, user);
    console.log(1);

    //Store in user entity
    await this.userService.updateUser(user.email, { apiKey });

    return { message: 'API Key successfully generated', apiKey };
  }
}
