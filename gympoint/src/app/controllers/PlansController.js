import Plan from '../models/Plan';

class PlansController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });
    return res.json(plans);
  }
}

export default new PlansController();
