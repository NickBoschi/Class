const data = require('../data/products.json');

function getProducts() {
    return data.products;
}

function getProduct() {
    return data.products.find(p => p.id === id);
}