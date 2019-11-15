import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Plan from '../models/Plan';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class EnrollmentsController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'active'],
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
        id: e.id,
        student: e.student.name,
        title_plan: e.plan.title,
        start: format(e.start_date, "dd' de 'MMMM' de 'yyyy", {
          locale: pt,
        }),
        end: format(e.end_date, "dd' de 'MMMM' de 'yyyy", {
          locale: pt,
        }),
        active: e.active,
      };
    });
    return res.json(result);
  }
}

export default new EnrollmentsController();
