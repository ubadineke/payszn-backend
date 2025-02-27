import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { PrivyAuthGuard } from 'src/auth/privy.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(PrivyAuthGuard)
  @Post('create-api-key')
  async createApiKey(@Req() req) {
    return await this.authService.generateApiKey(
      req.user.linkedAccounts[0].email,
    );
  }

  @UseGuards(PrivyAuthGuard)
  @Get()
  async fetchUser(@Req() req) {
    return this.usersService.findUserByEmail(req.user.linkedAccounts[0].email);
  }

  @UseGuards(PrivyAuthGuard)
  @Get('transactitons')
  async getTransactions(@Req() req) {
    return this.usersService.fetchUserTransactions(req.user.wallet.address);
  }

  @UseGuards(PrivyAuthGuard)
  @Patch()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(
      req.user.linkedAccounts[0].email,
      updateUserDto,
    );
  }
}
