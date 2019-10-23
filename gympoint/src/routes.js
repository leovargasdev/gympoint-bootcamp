import 'dotenv/config';

import { Router } from 'express';
// import multer from 'multer';
// import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
// const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

// Checkins
routes.post('/students/:student_id/checkins', CheckinController.store);
routes.get('/students/:student_id/checkins', CheckinController.index);

// Todas abaixo desse middleware devem ter um usuário autenticado, caso contrario o serviço é interrompido
routes.use(authMiddleware);

// Rotas referente a tabela Students
routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.put('/students/:student_id/edit', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

// Rotas referente a tabela Plans
routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.delete('/plans/:id', PlanController.delete);
routes.put('/plans/:id', PlanController.update);

// Rotas referente a tabela Enrollments
routes.post('/enrollments', EnrollmentController.store);
routes.get('/enrollments', EnrollmentController.index);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

// routes.post('/files', upload.single('file'), (req, res) => {
//   return res.json({ ok: true });
// });

export default routes;
