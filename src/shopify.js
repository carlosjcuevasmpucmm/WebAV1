const shopifyApi = require('shopify-api-node');
const { shopifyCre } = require('./config');



const shopify = new shopifyApi(shopifyCre);
async function getProduct(name) {
    const products = await shopify.product.list({ limit: 20 });
    return products.find(({ title }) => title.toLowerCase() === name);
}

async function createOrder( customerInfo, orderInfo) {
    const result = await shopify.order.create({
        fulfillment_status: 'fulfilled',
        send_receipt: true,
        send_fulfillment_receipt: true,
        inventory_behaviour: 'obey',
        customer: {...customerInfo},
        line_items: [...orderInfo]
    });
    return result;
}

async function getUser() {
    const result = await shopify.user.current();
    return result;
}

module.exports = {
    getProduct,
    createOrder,
    getUser
}


