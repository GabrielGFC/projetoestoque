const Familia = require('../models/Familia.js');

exports.get = async (req, res) => {
  try {
    const familia = await Familia.findAll();
    res.json(familia);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Erro servidor.' });
  }
}
//post
exports.register = async (req, res) => {
  const {
    nome,
    descricao,
    quantMin,
    quantMax
  } = req.body;
  try {
    await Familia.create({
      nome,
      descricao,
      quantMin,
      quantMax
    });
    res.status(201).json({ message: 'familia register successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.update = async (req, res) => {
    const { familia_id } = req.params;
    const {
        nome,
        descricao,
        quantMin,
        quantMax
    } = req.body;
    try {
        await Familia.update(
        {
            nome,
            descricao,
            quantMin,
            quantMax
        },
        { where: { idFamilia: familia_id } }
        );
        res.status(200).json({ message: 'familia updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    };

    exports.delete = async (req, res) => {
        const { familia_id } = req.params;
        try {
            await Familia.destroy({ where: { idFamilia: familia_id } });
            res.status(200).json({ message: 'familia deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };