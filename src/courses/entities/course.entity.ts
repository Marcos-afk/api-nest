import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from './Tag.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  description: string;

  @JoinTable()
  @ManyToMany(
    () => Tag,
    (tag: Tag) => {
      tag.courses;
    },
    {
      cascade: true,
    },
  )
  tags: Tag[];

  @Column('boolean', { default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
