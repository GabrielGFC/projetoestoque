//export da biblioteca
const Caixa = require("../models/Caixa");
const Pedido = require("../models/Pedido");
const User = require("../models/User");
//get
exports.get = async (req, res) => {
  try {
    const pedido = await Pedido.findAll({
      include: [
        { model: Caixa, attributes: ["idCaixa", "nome", "quantidade"] },
        { model: User, attributes: ["nome", "periodo", "box"] }],
    });
    res.json(pedido);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro servidor." });
  }
};
//post
exports.register = async (req, res) => {
  const { aprovacao, idCaixa, matricula } = req.body;
  try {
    await Pedido.create({
      aprovacao,
      idCaixa,
      matricula,
    });
    res.status(201).json({ message: "Pedido register successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//put
exports.update = async (req, res) => {
  const { pedido_id } = req.params;
  const { aprovacao, idCaixa, matricula } = req.body;
  try {
    await Pedido.update(
      {
        aprovacao,
        idCaixa,
        matricula,
      },
      { where: { idPedido: pedido_id } }
    );
    res.status(200).json({ message: "Pedido updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete
exports.delete = async (req, res) => {
  const { pedido_id } = req.params;

  try {
    await Pedido.destroy({ where: { idPedido: pedido_id } });
    res.status(202).json({ message: "Pedido deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "Internal server error" });
  }
};