import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async login(email: string, name: string, privyId: string) {
    //Create user entry or fetch existing
    const user = await this.userService.findOrCreateUser(email, name, privyId);
    return { message: 'Login successful', user };
  }
}
