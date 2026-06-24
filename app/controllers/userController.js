import { prisma } from '../../app.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error has occurred' });
  }
};

export const login = (req, res) => {
  res.send('You are login');
};