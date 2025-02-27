import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { PrivyAuthGuard } from 'src/auth/privy.guard';

@Controller('users')
@UseGuards(PrivyAuthGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('create-api-key')
  async createApiKey(@Req() req) {
    return await this.authService.generateApiKey(req.user.email);
  }

  @Get()
  async fetchUser(@Req() req) {
    return this.usersService.findUserByEmail(req.user.email);
  }

  @Get('transactitons')
  async getTransactions(@Req() req) {
    return this.usersService.fetchUserTransactions(req.user.wallet);
  }

  @Patch()
  async updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(req.user.email, updateUserDto);
  }
}
