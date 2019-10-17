import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeater = req.headers.authorization;

  if (!authHeater) {
    return res.status(401).json({ error: '' });
  }

  const token = authHeater.split(' ')[1];

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token Invalid' });
  }
  // return next();
};
