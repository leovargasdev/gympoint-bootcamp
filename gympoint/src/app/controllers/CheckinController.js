import { startOfDay, endOfDay, parseISO, subDays } from 'date-fns';
import { Op } from 'sequelize';

import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async store(req, res) {
    const student = await Student.findByPk(req.params.student_id);

    if (!student) return res.status(401).json({ error: 'Student not found' });

    const end_date = new Date();
    const start_date = subDays(new Date(), 7);

    const studentCheckins = await Checkin.count({
      where: {
        student_id: student.id,
        created_at: {
          [Op.between]: [startOfDay(start_date), endOfDay(end_date)],
        },
      },
    });
    if (studentCheckins > 4)
      return res.status(401).json({ error: 'Student exceeded allowed limit' });

    const checkin = await Checkin.create({
      student_id: student.id,
    });

    return res.json(checkin);
  }

  async index(req, res) {
    const student = await Student.findByPk(req.params.student_id);
    if (!student) return res.status(401).json({ error: 'Student not found' });

    const studentCheckins = await Checkin.count({
      where: { student_id: student.id },
    });

    return res.json({
      student: student.name,
      checkins: studentCheckins,
    });
  }
}

export default new CheckinController();
