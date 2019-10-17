import User from '../models/User';

class UserController {
  async store(req, res) {
    const UserExists = await User.findOne({ where: { email: req.body.email } });

    if (UserExists)
      return res.status(400).json({ error: 'User already exists.' });

    const { name, email, id, provider } = await User.create(req.body);

    return res.json({ name, email, id, provider });
  }

  async update(req, res) {
    console.log(req.userId);
    return res.json({ m: 'okay' });
  }
}

export default new UserController();
