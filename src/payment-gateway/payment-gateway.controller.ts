import {
  Controller,
  Post,
  Query,
  Req,
  Get,
  Body,
  UsePipes,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { ProcessTransactionDto } from './dto/process-transaction.dto';
import { ApiKeyGuard } from 'src/auth/apiKey.guard';
import { ApiKeyService } from 'src/api-key/api-key.service';

@Controller('payment-gateway')
export class PaymentGatewayController {
  constructor(
    private readonly paymentGatewayService: PaymentGatewayService,
    private readonly apiKeyService: ApiKeyService,
  ) {}

  @UseGuards(ApiKeyGuard)
  @Post('process')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async processTransaction(@Body() input: ProcessTransactionDto, @Req() req) {
    return this.paymentGatewayService.processTransaction(
      input.signature,
      input.expectedReceiver,
    );
  }

  @Get('verify')
  async verifyApiKey(@Query('api_key') api_key: string) {
    return this.apiKeyService.verifyApiKey(api_key);
  }
}
