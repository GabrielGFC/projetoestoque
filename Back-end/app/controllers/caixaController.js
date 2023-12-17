//export da biblioteca
const Caixa = require('../models/Caixa');
const Familia = require('../models/Familia');
const Item = require('../models/Item');
const User = require('../models/User');
//get
exports.get = async (req, res) => {
  try {
    const caixa = await Caixa.findAll({
      include: [
      { model: Familia, attributes: ['nome', 'descricao'] },
      { model: Item, attributes: ['nome', 'quantidade', 'descricao'] },
      { model: User, attributes: ['matricula', 'nome', 'idCargo', 'periodo'] }]
      
    }
    );
    res.json(caixa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro servidor.' });
  }
};
//post
exports.register = async (req, res) => {
  const {
    idItem,
    nome,
    matricula,
    quantidade
    } = req.body;
    try {
        
  await Caixa.create({
    idItem,
    nome,
    matricula,
    quantidade
});
        res.status(201).json({ message: 'Caixa register successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    };
//put
exports.update = async (req, res) => {
  const { caixa_id } = req.params;
  const {
    idItem,
    nome,
    matricula,
    quantidade
    } = req.body;
  try {
    
     await Caixa.update({ 
      idItem,
      nome,
      matricula,
      quantidade
    }
      , { where: { idCaixa:caixa_id} });
      res.status(200).json({ message: 'Caixa updated successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

//Delete
exports.delete = async(req,res) => {
const {caixa_id} = req.params;
const { } = req.body;
  try { await Caixa.destroy({ where: { idCaixa: caixa_id } });
    res.status(202).json({ message: 'Caixa deleted successfully' });}
  catch (error) {
      console.error(error);
      res.status(501).json({ message: 'Internal server error' });
    }
  };
