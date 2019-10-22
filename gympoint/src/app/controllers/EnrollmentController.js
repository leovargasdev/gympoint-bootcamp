import * as Yup from 'yup';

import { addMonths } from 'date-fns';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const { plan_id, student_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);
    if (!plan) return res.status(401).json({ error: 'Plan not found' });

    const studant = await Student.findByPk(student_id);
    if (!studant) return res.status(401).json({ error: 'Studant not found' });

    const price = plan.duration * plan.price;

    const enrollment = await Enrollment.create({
      plan_id,
      student_id,
      start_date,
      end_date: addMonths(new Date(start_date), plan.duration),
      price,
    });

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
