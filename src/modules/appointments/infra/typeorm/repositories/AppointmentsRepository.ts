import { getRepository, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositories';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
// DTO = Data Transfer Object

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  // private appointments: Appointment[];

  // constructor() {
  //   this.appointments = [];
  // }

  // // LISTAGEM
  // public all(): Appointment[] {
  //   return this.appointments;
  // }

  // POST

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    // funciona como se fosse um else
    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(appointment);

    return appointment;
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
