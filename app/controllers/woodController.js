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

export const create = async (req, res) => {
  try {
    const woodData = req.body.datas ? JSON.parse(req.body.datas) : req.body;

    const pathname = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : (woodData.image || null);

    const wood = await prisma.wood.create({
      data: {
        ...woodData,     
        image: pathname, 
      },
    });

    res.status(201).json(wood);

  } catch (err) {
    res.status(500).json({ error: err.message || 'An error occurred during creation' });
  }
};