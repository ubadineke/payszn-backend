import {
  Controller,
  Post,
  Query,
  Req,
  Body,
  UsePipes,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { ProcessTransactionDto } from './dto/process-transaction.dto';
import { ApiKeyGuard } from 'src/auth/apiKey.guard';

@Controller('payment-gateway')
export class PaymentGatewayController {
  constructor(private readonly paymentGatewayService: PaymentGatewayService) {}

  @UseGuards(ApiKeyGuard)
  @Post('process')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async processTransaction(@Body() input: ProcessTransactionDto, @Req() req) {
    return this.paymentGatewayService.processTransaction(
      input.signature,
      input.expectedReceiver,
    );
  }
}
