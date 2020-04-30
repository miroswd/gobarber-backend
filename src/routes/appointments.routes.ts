import { Router } from 'express';
// import { uuid } from 'uuidv4';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

// interface Appointment {
//   id: string;
//   provider: string;
//   date: Date;
// }

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

// http://localhost:3333/appointments == '/' # /appointments foi definido como use
appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  // const appointment = {
  //   id: uuid(),
  //   provider,
  //   date: parsedDate,
  // };
  // const appointment = new Appointment(provider, parsedDate);

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
