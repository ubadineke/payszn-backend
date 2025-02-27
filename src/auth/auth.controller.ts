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
    return { message: 'Logged in successfully', user: req.user };
  }
}
