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
  })
   afterEach(function () {
     sinon.restore();
   });
})