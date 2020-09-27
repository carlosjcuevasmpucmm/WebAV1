const { createOrder, getProduct, getUser} = require('./shopify');

async function getOrder(req, res) {
    try {
        const { name } = req.params;
        const result = await getProduct(name);
        return res.status(200).json({ result});
    } catch(err) {
        return res.status(500).json({ err });
    }
}

async function createOrders(req, res) {
    try {
        const { product_id, variant_id, quantity, first_name, last_name, email} = req.body;
        const user = {
            first_name,
            last_name,
            email
        }
        const order = {
            product_id,
            variant_id,
            quantity
        }
        console.log(user);
        console.log(order)
        const result = await createOrder(user, order);
        return res.status(200).json({result});
    } catch(err) {
        return res.status(500).json({ err})
    }
}

async function getUserCt(req, res) {
    try {
        const result= await getUser();
        return res.status(200).json({result});
    } catch(err) {
        return res.status(500).json({ err});
    }
}

module.exports = {
    getOrder,
    createOrders,
    getUserCt
}