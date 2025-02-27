import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrivyService } from './privy.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { TransactionsService } from 'src/transactions/transactions.service';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { ApiKeyService } from 'src/api-key/api-key.service';
import { ApiKey } from 'src/api-key/entities/api-key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApiKey, Transaction, User])],
  controllers: [AuthController],
  providers: [
    UsersService,
    TransactionsService,
    JwtService,
    ApiKeyService,
    PrivyService,
    AuthService,
  ],
})
export class AuthModule {}
