const experss = require('express');
const router = experss.Router();
const cargoController = require('../controllers/cargoController');

router.get('/',cargoController.get);
router.post('/',cargoController.register);

module.exports = router;