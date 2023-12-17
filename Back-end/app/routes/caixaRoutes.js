const express =require('express');
const router = express.Router();
const caixaController=require('../controllers/caixaController.js');

router.get('/',caixaController.get);
router.post('/',caixaController.register);
router.put('/:caixa_id',caixaController.update);
router.delete('/:caixa_id',caixaController.delete)
module.exports = router;
