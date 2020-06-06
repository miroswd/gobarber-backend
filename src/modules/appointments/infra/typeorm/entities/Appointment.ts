import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'; // entidade: algo q vai ser salvo no banco de dados

import User from '@modules/users/infra/typeorm/entities/User';

// PrimaryGeneratedColumn -> para gerar um id

@Entity('appointments') // Enviando a classe por parâmentro para o Entity
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  provider_id: string;

  @Column('timestamp with time zone')
  date: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

/* Removendo o constructor, pois será inicializado através do typeorm */
// constructor({ provider, date }: Omit<Appointment, 'id'>) {
//   this.id = uuid();
//   this.provider = provider;
//   this.date = date;
// }

export default Appointment;
