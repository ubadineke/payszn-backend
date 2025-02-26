import {
  Controller,
  Post,
  Query,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
// import ConfirmTransaction
import { ProcessTransactionDto } from './dto/process-transaction.dto';

@Controller('payment-gateway')
export class PaymentGatewayController {
  constructor(private readonly paymentGatewayService: PaymentGatewayService) {}

  @Post('process')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async processTransaction(@Body() input: ProcessTransactionDto) {
    return this.paymentGatewayService.confirmTransaction(
      input.signature,
      input.expectedReceiver,
    );
  }
}
