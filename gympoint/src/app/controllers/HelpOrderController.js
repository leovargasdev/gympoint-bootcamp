import * as Yup from 'yup';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import Queue from '../../lib/Queue';
import CreateHelpOrderMail from '../jobs/CreateHelpOrderMail';

class HelpOrderController {
  async store(req, res) {
    const student = await Student.findByPk(req.params.student_id);

    if (!student) return res.status(401).json({ error: 'Student not found' });

    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const helpOrder = await HelpOrder.create({
      student_id: student.id,
      question: req.body.question,
    });

    await Queue.add(CreateHelpOrderMail.key, {
      student,
      helpOrder,
    });

    return res.json(helpOrder);
  }

  async update(req, res) {
    const helpOrder = await HelpOrder.findByPk(req.params.id);

    if (!helpOrder)
      return res.status(401).json({ error: 'Help Order not found' });

    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const { answer } = req.body;

    await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    return res.json(helpOrder);
  }

  async index(req, res) {
    const student = await Student.findByPk(req.params.student_id);

    if (!student) return res.status(401).json({ error: 'Student not found' });

    const helpOrders = await HelpOrder.findAll({
      where: { student_id: student.id, answer: null },
    });

    return res.json(helpOrders);
  }
}

export default new HelpOrderController();
