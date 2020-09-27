require('dotenv').config();

const config = {
    shopifyCre: {
        shopName: process.env.SHOP_STORE,
        apiKey: process.env.SHOP_API_KEY,
        password: process.env.SHOPIFY_PASS
    }
}

module.exports = config;