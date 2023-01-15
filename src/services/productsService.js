const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getProduct = async (productId) => {
  const product = await productsModel.getProduct(productId);

  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: product };
};
module.exports = {
  getAll,
  getProduct,
};