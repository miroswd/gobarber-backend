import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';
// DTO = Data Transfer Object

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // private appointments: Appointment[];

  // constructor() {
  //   this.appointments = [];
  // }

  // // LISTAGEM
  // public all(): Appointment[] {
  //   return this.appointments;
  // }

  // POST

  public async findByDate(date: Date): Promise<Appointment | null> {
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    const findAppointment = await this.findOne({
      where: { date },
    });
    // funciona como se fosse um else
    return findAppointment || null;
  }

  // // O retorno vai ser um objeto do mesmo formato de appointment
  // // public create(provider: string, date: Date): Appointment {
  // public create({ provider, date }: CreateAppointmentDTO): Appointment {
  //   const appointment = new Appointment({ provider, date });

  //   this.appointments.push(appointment);

  //   return appointment;
  // }
}

export default AppointmentsRepository;
