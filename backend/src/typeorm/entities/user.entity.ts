import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ name: 'user_id', type: 'bigint', generated: 'increment' })
  userId: number;

  @Column({ name: 'full_name', nullable: true, length: 100 })
  //   @IsNotEmpty()
  fullName: string;

  @Column({ name: 'email_address', unique: true, length: 100 })
  @IsEmail()
  emailAddress: string;

  @Column({ name: 'password_hash', length: 100 })
  @IsNotEmpty()
  passwordHash: string;

  @Column({ name: 'hashed_rt', nullable: true, length: 100 })
  hashedRt: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  @Index()
  updatedAt: Date;
}
