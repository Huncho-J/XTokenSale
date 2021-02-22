const TokenSale = artifacts.require("./tokenSale.sol");
const XToken = artifacts.require("./xToken.sol");

const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

function tokens(n) {
	return web3.utils.toWei(n, 'ether');
}


contract('TOKENSALE', function(accounts){

  let tokenSale, xToken, tokenPrice, admin

  before(async () => {
    tokenPrice = 1000//in wei
    xToken = await XToken.deployed()
    tokenSale = await TokenSale.deployed(xToken.address, tokenPrice)
  })

  describe('deployment', async() => {

    it('deploys succesfully', async () => {
      const address = await TokenSale.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('it has xtokenContract', async () =>{
      xtokenContract = tokenSale.tokenContract();
      tokenPrice = await tokenSale.tokenPrice();
      assert.notEqual(xtokenContract, 0x0)
      assert.equal(tokenPrice.toNumber(), 100)
    })
      //it facilitates buying tokens
    it('it facilitates buying tokens', async () =>{
       admin = accounts[0];
       numberOfTokens = 2;
       totalPrice = 100 * numberOfTokens;
       buyer = accounts[1]
       //give tokenSale some tokens
      xToken.transfer(tokenSale.address, 10,{from: admin});
      tokenPurchase = await tokenSale.buyToken(numberOfTokens, {from: buyer, value: totalPrice})
      tokensSold = await tokenSale.tokensSold()
      assert.equal(tokensSold.toNumber(), 2, "it updates tokens sold")

    })
  //})
})

})
