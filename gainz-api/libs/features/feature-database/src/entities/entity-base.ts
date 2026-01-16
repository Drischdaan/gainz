import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class ApiBaseEntity {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: 'string', format: 'date' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date' })
  @UpdateDateColumn()
  updatedAt: Date;
}
