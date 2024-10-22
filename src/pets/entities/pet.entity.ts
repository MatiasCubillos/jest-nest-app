import { Column, DeleteDateColumn, Entity } from 'typeorm';

@Entity()
export class Pet {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  age: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column()
  allVaccines: boolean;
}
