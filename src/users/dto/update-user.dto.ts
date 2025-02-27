import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, ValidateIf, IsUrl } from 'class-validator';

export class UpdateUserDto {
  // @IsOptional()
  // @IsUrl()
  // webhookUrl: string;

  // @IsOptional()
  // @IsUrl()
  // callbackUrl?: string;

  @ValidateIf((o) => !o.callbackUrl) // Requires at least one
  @IsUrl()
  webhookUrl?: string;

  @ValidateIf((o) => !o.webhookUrl) // Requires at least one
  @IsUrl()
  callbackUrl?: string;
}

export class AllowedUserUpdateDto {
  apiKey?: string;
  webhookUrl?: string;
  callbackUrl?: string;
}
