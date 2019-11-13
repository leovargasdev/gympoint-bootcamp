import Student from '../models/Student';

class StudentsController {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'name', 'age', 'email'],
    });

    return res.json(students);
  }
}

export default new StudentsController();
