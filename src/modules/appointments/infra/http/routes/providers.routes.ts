import { Router } from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

// Middleware

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAutheticated); // Todas as rotas de providers precisam de autenticação

providersRouter.get('/', providersController.index);

export default providersRouter;
