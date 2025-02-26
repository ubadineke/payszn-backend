import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { PaymentGatewayController } from './payment-gateway.controller';
import { TransactionsService } from 'src/transactions/transactions.service';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Transaction])],
  controllers: [PaymentGatewayController],
  providers: [
    JwtService,
    TransactionsService,
    UsersService,
    PaymentGatewayService,
  ],
})
export class PaymentGatewayModule {}
