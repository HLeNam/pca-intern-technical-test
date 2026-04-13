import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@Index('unique_email_active', ['email'], {
  unique: true,
  where: '"deleted" = false',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  email!: string;

  @Column({ name: 'first_name' })
  firstName!: string;

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  deleted!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
