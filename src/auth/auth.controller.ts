import {
  Controller,
  Get,
  Req,
  Post,
  UseGuards,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrivyAuthGuard } from './privy.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(PrivyAuthGuard)
  @Post('login')
  login(@Req() req) {
    console.log(req.user);
    const email = req.user.linkedAccounts[0].email;
    const name = req.user.linkedAccounts[0].name;
    const wallet = req.user.wallet.address;
    const privyId = req.user.id;
    return this.authService.login(email, name, wallet, privyId);
  }
}
