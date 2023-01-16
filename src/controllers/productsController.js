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

const createProduct = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  const newProduct = await productsService.createProduct({ name });
  // if (!newProduct) return res.status(404).json({ message: 'não foi possivel cadastrar' });
  res.status(201).json(newProduct);
};

module.exports = {
  getAll,
  getProduct,
  createProduct,
};