const verificaProductId = (req, res, next) => {
  const { productId } = req.body;
  console.log(productId);
};

module.exports = {
  verificaProductId,
};