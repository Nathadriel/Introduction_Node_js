import { prisma } from '../../app.js';

export const signup = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error has occurred' });
  }
};

export const login = (req, res) => {
  res.send('You are login');
};