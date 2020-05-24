// Responsável apenas pela criação do Agendamento

/** Resolvendo os problemas
 *  [x] Recebimento das informações
 *  [/] Tratativas de erros e exceções
 *  [x] Acesso ao repositório
 */

import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // create não salva no banco de dados

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
