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
  @Get('me')
  async fetchUser(@Req() req) {
    return this.usersService.findUserByEmail(req.user.linkedAccounts[0].email);
  }

  @UseGuards(PrivyAuthGuard)
  @Get('transactions')
  async getTransactions(@Req() req) {
    return this.usersService.fetchUserTransactions(req.user.wallet.address);
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
