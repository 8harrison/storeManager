const { expect } = require("chai");
const sinon = require("sinon");
const  productService  = require('../../../src/services/productsService')
const  productModel  = require('../../../src/models/productsModel')

const { allProducts } = require('./mocks/productsService.mocks')

describe('Verificando service products', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      //Arrange
      sinon.stub(productModel, 'getAll').resolves(allProducts);
      //Act
      const result = await productService.getAll();
      //Assert
      expect(result).to.be.equal(allProducts)
    })
    it('retorna um produto especifico', async function () {
      //Arrange
      sinon.stub(productModel, 'getProduct').resolves(allProducts[0]);
      //Act
      const  result  = await productService.getProduct(1);
      //Assert
      expect(result.message).to.be.deep.equal(allProducts[0])
    })
  })
  it("retorna um erro caso produto não exista", async function () {
    //Arrange
    sinon.stub(productModel, "getProduct").resolves(undefined);
    //Act
    const result = await productService.getProduct(1);
    //Assert
    expect(result.message).to.be.deep.equal('Product not found');
  });
   afterEach(function () {
     sinon.restore();
   });
})