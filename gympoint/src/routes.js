import 'dotenv/config';

import { Router } from 'express';
// import multer from 'multer';
// import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';

import StudentController from './app/controllers/StudentController';
import StudentsController from './app/controllers/StudentsController';

import PlanController from './app/controllers/PlanController';
import PlansController from './app/controllers/PlansController';

import EnrollmentController from './app/controllers/EnrollmentController';
import EnrollmentsController from './app/controllers/EnrollmentsController';

import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
// const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

// Checkins
routes.post('/students/:student_id/checkins', CheckinController.store);
routes.get('/students/:student_id/checkins', CheckinController.index);

// Help Orders
routes.post('/students/:student_id/help-orders', HelpOrderController.store);
routes.get('/students/:student_id/help-orders', HelpOrderController.index);

// Todas abaixo desse middleware devem ter um usuário autenticado, caso contrario o serviço é interrompido
routes.use(authMiddleware);

// Help Orders
routes.put('/help-orders/:id/answer', HelpOrderController.update);

// Rotas referente a tabela Students
routes.post('/students', StudentController.store);
routes.put('/student/:student_id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);
routes.get('/student/:student_id', StudentController.index);

// Listar todos Students
routes.get('/students', StudentsController.index);

// Rotas referente a tabela Plans
routes.post('/plans', PlanController.store);
routes.get('/plan/:plan_id', PlanController.index);
routes.delete('/plan/:plan_id', PlanController.delete);
routes.put('/plan/:plan_id', PlanController.update);

// Listar todos Plans
routes.get('/plans', PlansController.index);

// Rotas referente a tabela Enrollments
routes.post('/enrollments', EnrollmentController.store);
routes.get('/enrollment/:id', EnrollmentController.index);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

// Listar todos os Enrollments
routes.get('/enrollments', EnrollmentsController.index);
export default routes;
