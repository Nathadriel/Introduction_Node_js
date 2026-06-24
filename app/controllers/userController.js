import { prisma } from '../../app.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message || 'An error occurred' });
  }
};

export const login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = await new Promise((resolve, reject) => {
      jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '24h' }, (err, token) => {
        if (err) reject(err);
        else resolve(token);
      });
    });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message || 'An error occurred' });
  }
};