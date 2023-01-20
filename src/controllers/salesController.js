const salesService = require('../services/salesService');
// const productsService = require('../services/productsService');
const trataErro = (error, res) => {
  if (error.message.includes('must be greater')) {
    return res.status(422).json({ message: error.message });
  }
  if (error.message.includes('is required')) {
    return res.status(error.status).json({ message: error.message });
  }
  if (error.message.includes('not found')) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

const createSales = async (req, res) => {
  try {
    const sales = req.body;
    const newSales = await salesService.createSales(sales);
    // console.log(newSales);
    // const { productId, quantity } = newSales;
    return res.status(201).json(newSales);
  } catch (error) {
    trataErro(error, res);
  }
};

module.exports = {
  createSales,
};