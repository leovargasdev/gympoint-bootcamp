import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      name: Yup.string().required(),
      age: Yup.number()
        .required()
        .positive()
        .integer(),
      height: Yup.number()
        .required()
        .positive(),
      weight: Yup.number()
        .required()
        .positive(),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const student = await Student.create(req.body);

    return res.json(student);
  }

  // Corrigir rota, passar o id nela pelo header
  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      name: Yup.string(),
      age: Yup.number()
        .positive()
        .integer(),
      height: Yup.number().positive(),
      weight: Yup.number().positive(),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const { email: e } = req.body;
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    // Ao solicitar a troca de email
    if (e && e !== student.email) {
      const StudentExist = await Student.findOne({ where: { email: e } });
      // Verificar se já não existe outra conta com esse email
      if (StudentExist) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    const { name, email, age, height, weight } = await student.update(req.body);

    return res.json({ name, email, age, height, weight });
  }
}

export default new StudentController();
