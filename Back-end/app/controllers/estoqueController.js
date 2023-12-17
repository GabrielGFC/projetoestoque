//export da biblioteca
const Caixa = require('../models/Caixa');
const Estoque = require('../models/Estoque');
const User = require('../models/User'); // Add this line

//get
exports.get = async (req, res) => {
  try {
    const estoque = await Estoque.findAll({
      include: [ 
      { model: Caixa, attributes: ['idCaixa', 'nome', 'quantidade'] },
      { model: User, attributes: ["nome", "periodo", "box"] }],
    });
    res.json(estoque);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar estoque.' });
    }
};
//get by Matricula
exports.getByMatricula = async (req, res) => {
  try {
    const { matricula } = req.params;
    const estoque = await Estoque.findOne({
      include: [
        { model: Caixa,
          attributes: ['idCaixa', 'nome', 'quantidade', 'matricula'],
          where: { matricula: matricula } },
        { model: User, attributes: ["nome", "periodo", "box"] },
      ]
    });
    res.json(estoque);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar estoque." });
  }
};
exports.getById = async (req, res) => {
  try {
    const { idEstoque } = req.params; // Obtém o ID da solicitação

    const estoque = await Estoque.findByPk(idEstoque, {
      include: [
        { model: Caixa, attributes: ['idCaixa', 'nome', 'quantidade'] },
        { model: User, attributes: ["nome", "periodo", "box"] },
      ]
    });

    if (!estoque) {
      return res.status(404).json({ error: 'Item de estoque não encontrado.' });
    }

    res.json(estoque);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar item de estoque.' });
  }
};
    
//post
exports.register = async (req, res) => {
  const {
    idCaixa,
    matricula
  } = req.body;

  try {
    let
    idCaixaStr = idCaixa.toString();
    
  if (idCaixa && idCaixaStr.length <= 3)
  {}
  else {return res.status(401).json({ message: 'Número da caixa não preenchido ou inválido'});}
  
  await Estoque.create({
    idCaixa,
    matricula
    });
    res.status(201).json({ message: 'Estoque register successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//put
exports.update = async (req, res) => {
  const { estoque_id } = req.params;
  const { 
   idCaixa,
   matricula
  } = req.body;

  try {
    let
    idCaixaStr = idCaixa.toString();
    
  if (idCaixa && idCaixaStr.length <= 3)
  {}
  else {return res.status(401).json({ message: 'Número da caixa não preenchido ou inválido' });}

    await Estoque.update({ 
    idCaixa,
    matricula
    },
  
    { where: { idEstoque: estoque_id } });
    res.status(200).json({ message: 'Estoques updated successfully' });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

//delete
exports.delete = async (req, res) => {
    const { estoque_id } = req.params;
    try {
        await Estoque.destroy({ where: { idEstoque: estoque_id } });

        res.status(200).json({ message: 'Estoques deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};