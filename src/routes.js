const { Router } = require('express');
const { createOrders,  getUserCt, getAllProducts, getCheckout, getProductCT} = require('./controller');

const router = Router();

router.get('/products', getProductCT);
router.get('/', getAllProducts);
router.get('/:id', getCheckout);
router.post('/create', createOrders);

module.exports = router;