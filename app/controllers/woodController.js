import { prisma } from '../../app.js';

export const readAll = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();
    res.status(200).json(woods);
  } catch (err) {
    res.status(500).json({ error: err.message || 'An error occurred' });
  }
};

export const readByHardness = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany({
      where: {
        hardness: req.params.hardness,
      },
    });
    res.status(200).json(woods);
  } catch (err) {
    res.status(500).json({ error: err.message || 'An error occurred' });
  }
};

