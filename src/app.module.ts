import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { PrivyService } from './auth/privy.service';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersService } from './users/users.service';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'your_password',
      database: 'cfg_backend',
      autoLoadEntities: true, // Automatically loads entities
      synchronize: true, // Auto-create tables (disable in production)
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }) as any,
    AuthModule,
    UsersModule,
    TypeOrmModule.forFeature([User]),
    PaymentGatewayModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    UsersService,
    AuthService,
    ConfigService,
    PrivyService,
    AppService,
  ],
})
export class AppModule {}
