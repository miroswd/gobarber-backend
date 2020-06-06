import { Router } from 'express';
// import { uuid } from 'uuidv4';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

// Middleware
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAutheticated); // Todas as rotas de appointments precisam de autenticação
// interface Appointment {
//   id: string;
//   provider: string;
//   date: Date;
// }

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

// http://localhost:3333/appointments == '/' # /appointments foi definido como use
appointmentsRouter.post('/', async (request, response) => {
  const appointmentsRepository = new AppointmentsRepository();

  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date); // Formatando data
  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
