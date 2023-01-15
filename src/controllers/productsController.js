const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProduct(id);
  
  if (type) return res.status(404).json({ message: 'Product not found' });
  
  res.status(200).json(message);
};
module.exports = {
  getAll,
  getProduct,
};