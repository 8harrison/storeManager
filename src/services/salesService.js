const Joi = require('joi');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const schema = Joi.object({
  productId: Joi.number()
    .min(1)
    .label('productId')
    .integer()
    .empty('')
    .required(),
  quantity: Joi.number()
    .min(1)
    .label('quantity')
    .integer()
    .empty('')
    .required(),
})
  .required()
  .messages({
    'number.empty': '400',
    'number.min': '{#label} must be greater than or equal to 1',
    'any.required': '{#label} is required',
  });
const createSales = async (itemsSold) => {
  const saleArraySchema = Joi.array().items(schema);
  const items = saleArraySchema.validate(itemsSold);
  const { error } = items;
  if (error) {
    const errorMsg = { status: 400, message: error.message };
    throw errorMsg;
  }
  const newRetorno = itemsSold.map((item) => {
    const product = productsModel.getProduct(item.productId);
    return product;
  });
  console.log(newRetorno);
  const newSaleResolvePromise = await Promise.all(newRetorno);
  const xablau = newSaleResolvePromise.filter((item) => item === undefined);
  const productNotFound = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  if (xablau.length > 0) throw productNotFound;
  const retorno = await salesModel.createSales(itemsSold);
  return retorno;
  // const newSale = itemsSold.map((sale) => salesModel.createSales(sale.productId, sale.quantity));
  // const newSaleResolvePromise = await Promise.all(newSale);

  // return newSaleResolvePromise;
};

module.exports = {
  createSales,
};