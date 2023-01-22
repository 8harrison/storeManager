const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const { expect } = chai;
chai.use(sinonChai);

const productService = require('../../../src/services/productsService')
const productsController = require('../../../src/controllers/productsController')
const productsMock = require('./mocks/productController.mock')

describe('Teste de unidade do productsController', function () {
  describe('Listando os produtos', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      //Arrange
      const res = {}
      const req = {}

      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns()

      sinon
        .stub(productService, 'getAll')
        .resolves( productsMock )
      
      //Act
      await productsController.getAll(req, res);

      //Assert
      expect(res.status).to.have.been.calledWith(200)
      expect(res.json).to.have.been.calledWith(productsMock)
    })
     it("Deve retornar o status 200 e a e um produto", async function () {
       //Arrange
       const res = {};
       const req = {params:{id: 1}};

       res.status = sinon.stub().returns(res);
       res.json = sinon.stub().returns();

       sinon.stub(productService, "getProduct").resolves({ type: null, message: productsMock[0]});

       //Act
       await productsController.getProduct(req, res);

       //Assert
       expect(res.status).to.have.been.calledWith(200);
       expect(res.json).to.have.been.calledWith(productsMock[0]);
     });
  })
  afterEach(function () {
    sinon.restore();
  });
})