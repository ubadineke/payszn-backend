// auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = this.extractApiKeyFromHeader(request);

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    try {
      // Verify the JWT token
      const payload = this.jwtService.verify(apiKey, {
        secret: this.configService.get<string>('JWT_SECRET') as string,
      });

      // Fetch the user from the database
      const user = await this.usersService.findUserByEmail(payload.email);

      if (!user || user.apiKey !== apiKey) {
        throw new UnauthorizedException('Invalid API key');
      }

      // Attach the user to the request object
      request['user'] = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid API key');
    }
  }

  private extractApiKeyFromHeader(request: Request): string | undefined {
    // Extract from Authorization header (Bearer token)
    // const authHeader = request.headers.authorization;
    // if (authHeader && authHeader.startsWith('Bearer ')) {
    //   return authHeader.substring(7);
    // }

    // // Or extract from query parameter
    // if (request.query.apiKey) {
    //   return request.query.apiKey as string;
    // }

    // // Or extract from custom header
    // return request.headers['x-api-key'] as string;

    // }
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
