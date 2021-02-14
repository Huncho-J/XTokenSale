const TokenSale = artifacts.require("./tokenSale.sol");
const XToken = artifacts.require("./xToken.sol");

const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract('TOKENSALE', function(accounts){

  let tokenSale, xToken

  before(async () => {
    xTok  en = await XToken.deployed()
    tokenSale = await TokenSale.deployed(xToken.address)
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
      //const xtokenContract = await TokenSale.tokenContract();
    //  assert.notEqual(address, 0x0)
    })
  })

  //it facilitates buying tokens


})
