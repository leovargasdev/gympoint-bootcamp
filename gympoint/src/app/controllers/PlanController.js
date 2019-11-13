import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .required()
        .positive()
        .integer()
        .max(12),
      price: Yup.number()
        .required()
        .positive(),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const plan = await Plan.create(req.body);
    return res.json(plan);
  }

  async index(req, res) {
    const { plan_id } = req.params;
    const plan = await Plan.findByPk(plan_id, {
      attributes: ['id', 'title', 'duration', 'price'],
    });
    return res.json(plan);
  }

  async delete(req, res) {
    const { plan_id } = req.params;
    await Plan.destroy({ where: { plan_id } });
    return res.json({ message: 'Plan successfully removed' });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number()
        .positive()
        .integer()
        .max(12),
      price: Yup.number().positive(),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const { title } = req.body;
    const plan = await Plan.findByPk(req.params.plan_id);
    // O título do plano deve ser único, esse condicional garante que não vá existir dois planos com o mesmo title
    if (title && plan.title !== title) {
      const checkTitlePlan = await Plan.findOne({ where: { title } });
      if (checkTitlePlan)
        return res.status(400).json({ error: 'Plan title already exists.' });
    }
    await plan.update(req.body);
    return res.json(plan);
  }
}

export default new PlanController();
