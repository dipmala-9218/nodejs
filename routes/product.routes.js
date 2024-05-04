const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const validator = require('../middleware/validator');
const middleValidator = require('../middleware/validation');

router.get('/products', productController.getAll);
router.post('/products', [validator.insert, middleValidator], productController.insert);
router.get('/products/:id', productController.get);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.delete);

module.exports = router;
