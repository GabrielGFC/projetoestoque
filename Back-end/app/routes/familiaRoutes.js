const express =require('express');
const router = express.Router();
const familiaController=require('../controllers/familiaController.js');

router.get('/',familiaController.get);
router.post('/',familiaController.register);
router.put('/:familia_id',familiaController.update);
router.delete('/:familia_id',familiaController.delete);

module.exports = router;
