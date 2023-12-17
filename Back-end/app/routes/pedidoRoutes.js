const express =require('express');
const router = express.Router();
const pedidoController=require('../controllers/PedidoController');

router.get('/',pedidoController.get);
router.post('/',pedidoController.register);
router.put('/:pedido_id',pedidoController.update);
router.delete('/:pedido_id',pedidoController.delete)
module.exports = router;
