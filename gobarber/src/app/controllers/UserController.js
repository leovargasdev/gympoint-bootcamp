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
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const UserExists = await User.findOne({ where: { email } });

      if (UserExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { name, provider } = await user.update(req.body);

    return res.json({
      id: req.userId,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
