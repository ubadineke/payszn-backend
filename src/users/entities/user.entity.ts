import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  privyId: string;

  @Column({ unique: true })
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  apiKey: string;

  @Column({ nullable: true })
  webhookUrl: string;

  @Column({ nullable: true })
  callbackUrl: string;

  @Column({ default: true })
  isActive: boolean;
}
