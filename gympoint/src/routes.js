import 'dotenv/config';

import { Router } from 'express';
// import multer from 'multer';
// import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
// const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

// Todas abaixo desse middleware devem ter um usuário autenticado, caso contrario o serviço é interrompido
routes.use(authMiddleware);

// Rotas referente a tabela Students
routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.put('/students/:student_id/edit', StudentController.update);

// Rotas referente a tabela Plans
routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.delete('/plans/:id', PlanController.delete);
routes.put('/plans/:id', PlanController.update);

// Rotas referente a tabela Enrollments
routes.post('/enrollments', EnrollmentController.store);

// routes.post('/files', upload.single('file'), (req, res) => {
//   return res.json({ ok: true });
// });

export default routes;
