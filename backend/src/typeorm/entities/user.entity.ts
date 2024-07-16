import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

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
  // @IsNotEmpty()  //bc of googleauth, fix later
  passwordHash: string;

  @Column({ name: 'hashed_rt', nullable: true, length: 100 })
  hashedRt: string;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: ['male', 'female'],
    nullable: false,
  })
  gender: 'male' | 'female';

  @Column({ name: 'dob', type: 'date', nullable: true })
  dob: Date;

  @Column({
    name: 'uuid',
    type: 'uuid',
    // default: () => uuidv4(),
    unique: true,
  })
  uuid: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 10,
    default: 1000000000,
  })
  phoneNumber: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

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
