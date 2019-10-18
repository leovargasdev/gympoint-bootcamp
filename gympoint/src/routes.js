import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// Todas abaixo desse middleware devem ter um usuário autenticado, caso contrario o serviço é interrompido
routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students/:student_id/edit', StudentController.update);

export default routes;
