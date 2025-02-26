import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrivyService } from 'src/auth/privy.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, User])],
  controllers: [UsersController],
  providers: [
    PrivyService,
    TransactionsService,
    UsersService,
    JwtService,
    AuthService,
  ],
})
export class UsersModule {}
