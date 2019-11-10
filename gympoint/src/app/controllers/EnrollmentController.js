import * as Yup from 'yup';

import { addMonths } from 'date-fns';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';
import Queue from '../../lib/Queue';
import SuccessEnrollmentMail from '../jobs/SuccessEnrollmentMail';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      attributes: [
        'id',
        'price',
        'start_date',
        'end_date',
        'dt_format',
        'active',
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
    });
    const result = enrollments.map(e => {
      return {
        student: e.student.name,
        title_plan: e.plan.title,
        price: e.price,
        duration: e.dt_format,
        active: e.active,
      };
    });
    return res.json(result);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment)
      return res.status(401).json({ error: 'Enrollment not found' });

    const { plan_id, start_date: sd, student_id } = req.body;
    // Pega a nova data ou a antiga, para poder calcular o end_data
    const start_date = sd || enrollment.start_date;

    const plan = await Plan.findByPk(plan_id);

    // O plan_id deve ter mudado para poder verificar o plan, pois caso o plano não mude o plan_id pode vim com undefined
    if (plan_id && !plan) {
      return res.status(401).json({ error: 'Plan not found' });
    }

    const student = await Student.findByPk(student_id);
    if (student_id && !student)
      return res.status(401).json({ error: 'Student not found' });

    await enrollment.update({
      student_id,
      plan_id,
      start_date,
      end_date: plan
        ? addMonths(start_date, plan.duration)
        : enrollment.end_date,
      price: plan ? plan.duration * plan.price : enrollment.price,
    });

    return res.json(enrollment);
  }

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

    const student = await Student.findByPk(student_id);
    if (!student) return res.status(401).json({ error: 'Student not found' });

    const price = plan.duration * plan.price;

    const enrollment = await Enrollment.create({
      plan_id,
      student_id,
      start_date,
      end_date: addMonths(new Date(start_date), plan.duration),
      price,
    });

    await Queue.add(SuccessEnrollmentMail.key, {
      enrollment,
      student,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const { id } = req.params;
    await Enrollment.destroy({ where: { id } });
    return res.json({ message: 'Enrollment successfully removed' });
  }
}

export default new EnrollmentController();
