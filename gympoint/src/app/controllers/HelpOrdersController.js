// import * as Yup from 'yup';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
// import Queue from '../../lib/Queue';
// import CreateHelpOrderMail from '../jobs/CreateHelpOrderMail';
// import AnswerHelpOrder from '../jobs/AnswerHelpOrder';

class HelpOrdersController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer: null },
      attributes: ['id', 'question', 'student_id'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return res.json(helpOrders);
  }
}

export default new HelpOrdersController();
