import { Role } from 'src/interfaces/role-enum';
import { Column, DeleteDateColumn, Entity } from 'typeorm';

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role_id: number;

  @DeleteDateColumn()
  deletedAt: Date;
}
