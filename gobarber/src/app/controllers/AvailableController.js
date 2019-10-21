class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) res.status(401).json({ error: 'Invalid date' });
    return res.json({});
  }
}

export default new AvailableController();
