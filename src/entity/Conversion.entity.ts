import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('conversions')
export class Conversion {

  constructor(deepLink?: Partial<Omit<Conversion, 'id'>>) {
    if (deepLink) {
      Object.assign(this, deepLink);
    }
  }

  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 355, unique: true, nullable: false })
  webUrl: string;

  @Column('varchar', { length: 355, unique: true, nullable: false })
  deepLink: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
