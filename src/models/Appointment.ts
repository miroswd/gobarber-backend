import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; // entidade: algo q vai ser salvo no banco de dados

// PrimaryGeneratedColumn -> para gerar um id

@Entity('appointments') // Enviando a classe por parâmentro para o Entity
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

/* Removendo o constructor, pois será inicializado através do typeorm */
// constructor({ provider, date }: Omit<Appointment, 'id'>) {
//   this.id = uuid();
//   this.provider = provider;
//   this.date = date;
// }

export default Appointment;
