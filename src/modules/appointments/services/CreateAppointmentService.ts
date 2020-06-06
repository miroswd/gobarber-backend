// Responsável apenas pela criação do Agendamento

/** Resolvendo os problemas
 *  [x] Recebimento das informações
 *  [/] Tratativas de erros e exceções
 *  [x] Acesso ao repositório
 */

import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';

import IAppoitmentsRepository from '../repositories/IAppointmentsRepositories';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppoitmentsRepository,
  ) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // create não salva no banco de dados. Mas agora foi implementado em outro método
    // await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
