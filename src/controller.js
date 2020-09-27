const { createOrder, getProduct, getProducts, checkout} = require('./shopify');

async function getProductCT(req, res) {
    try {
        const { name } = req.query;
        const products = await getProduct(name);
        return res.status(200).json({ products});
    } catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await getProducts();
        return res.status(200).json({products});
    } catch(err) {
        return res.status(500).json({ err});
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
        const result = await createOrder(user, order);
        return res.status(200).json({result});
    } catch(err) {
        console.log(err)
        return res.status(500).json({ err})
    }
}


async function getCheckout(req, res) {
    try {
        const balance = await checkout(req.params.id)
        // const balance = await product();
        return res.status(200).json({balance});
    } catch(err) {
        console.log(err);
        const { body} = err.response;
        return res.status(500).json({ body});
    }
}

module.exports = {
    getProductCT,
    createOrders,
    getAllProducts,
    getCheckout
}