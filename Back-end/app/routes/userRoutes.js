const express =require('express');
const router = express.Router();
const userController=require('../controllers/userController.js');

router.get('/',userController.get);
router.post('/',userController.register);
router.put('/:user_id',userController.update);
router.delete('/:user_id',userController.delete);

module.exports = router;
