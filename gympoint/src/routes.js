import 'dotenv/config';

import { Router } from 'express';
// import multer from 'multer';
// import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
// const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

// Todas abaixo desse middleware devem ter um usuário autenticado, caso contrario o serviço é interrompido
routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.put('/students/:student_id/edit', StudentController.update);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.delete('/plans/:id', PlanController.delete);
routes.put('/plans/:id', PlanController.update);

// routes.post('/files', upload.single('file'), (req, res) => {
//   return res.json({ ok: true });
// });

export default routes;
