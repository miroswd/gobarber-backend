import { Router } from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

// Middleware

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

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
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
