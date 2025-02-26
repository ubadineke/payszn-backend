import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrivyClient } from '@privy-io/server-auth';
import Request from 'express';

interface RequestWithCookies extends Request {
  cookies: {
    [key: string]: string;
  };
}

@Injectable()
export class PrivyService {
  private privyClient: PrivyClient;

  constructor(private configService: ConfigService) {
    this.privyClient = new PrivyClient(
      this.configService.get<string>('PRIVY_APP_ID') as string,
      this.configService.get<string>('PRIVY_APP_SECRET') as string,
    );
  }
  async verifyToken(token: string): Promise<any> {
    try {
      // Verify the JWT token using Privy's server SDK
      console.log('incoming token', token);
      const verifiedToken = await this.privyClient.verifyAuthToken(token);
      return verifiedToken;
    } catch (error) {
      throw new Error(`Failed to verify Privy token: ${error.message}`);
    }
  }

  async getUserData(req: RequestWithCookies): Promise<any> {
    const idToken = req.cookies?.['privy-id-token']; // Retrieve token from cookies

    if (!idToken) {
      throw new UnauthorizedException('No Privy identity token found');
    }

    try {
      // Get user details from Privy
      return await this.privyClient.getUser({ idToken });
    } catch (error) {
      throw new Error(`Failed to get user from Privy: ${error.message}`);
    }
  }
  async getUserAgain(userId: string) {
    try {
      return await this.privyClient.getUser(userId);
    } catch (error) {
      throw new Error(`Failed to get user from Privy 2: ${error.message}`);
    }
  }
}
