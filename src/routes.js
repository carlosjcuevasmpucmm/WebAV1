const { Router } = require('express');
const { createOrders, getOrder, getUserCt} = require('./controller');

const router = Router();

router.get('/user/:id', getUserCt);
router.get('/:name', getOrder);
router.post('/create', createOrders);

module.exports = router;