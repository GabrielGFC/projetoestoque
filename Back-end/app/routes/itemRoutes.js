const express =require('express');
const router = express.Router();
const ItemController=require('../controllers/itemController');

router.get('/',ItemController.get);
router.post('/',ItemController.register);
router.put('/:item_id',ItemController.update);
router.delete('/:item_id',ItemController.delete);

module.exports = router;
