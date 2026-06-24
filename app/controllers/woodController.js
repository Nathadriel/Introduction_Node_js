import { prisma } from '../../app.js';

export const woodsList = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();
    res.status(200).json(woods);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Une erreur est survenue' });
  }
};

export const readAll = (req, res) => {
  res.send('List of woods');
};

