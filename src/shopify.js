const shopifyApi = require('shopify-api-node');
const { shopifyCre } = require('./config');



const shopify = new shopifyApi(shopifyCre);
async function getProduct(name) {
    const products = await shopify.product.list({ limit: 20, status: "active" });
    const { id, title, variants} = products.find(({ title }) => title.toLowerCase().search(name) != -1);
    const variant = cleanData(variants);
    return {id, title, variant};
}

async function getProducts() {
    // const { id, title, variants} = await shopify.product.list();
    // console.log(variants);
    const result = await shopify.product.list();
    const products = cleanData2(result);
    // return {id, title, variant};
    return products;
}
function cleanData(variants) {
    return variants.map((variant) => {
        const {id, product_id, title, price, inventory_quantity} = variant;
        return {id, product_id, title, price, inventory_quantity}
    })
}

function cleanData2(array) {
    return array.map(product => {
        const { id, title, variants} = product;
        const variant = variants.map(variant => {
            const { product_id, title: title_product, price, inventory_quantity} = variant;
            return { product_id, title: title_product, price, inventory_quantity}
        })
        return { id, title, variant};
    })
}
async function product() {
    return await shopify.product.list({ status: "active"});
}

async function createOrder( customerInfo, orderInfo) {
    const result = await shopify.order.create({
        fulfillment_status: 'fulfilled',
        send_fulfillment_receipt: true,
        inventory_behaviour: 'bypass',
        customer: {...customerInfo},
        line_items: [{...orderInfo}]
    });
    return result;
}


async function checkout(idOrder) {
    const {id, total_price, email} = await shopify.order.get(idOrder);
    return {id, total_price, email};
}


module.exports = {
    getProduct,
    createOrder,
    getProducts,
    checkout,
    product
}


