  const XToken = artifacts.require("./xToken.sol");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract('XTOKEN', function(accounts){

  let xToken

  before(async () => {
    xToken = await XToken.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await XToken.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
     const name = await xToken.name()
     assert.equal(name, 'xToken')
    })
    it('has a symbol', async () => {
      const symbol = await xToken.symbol()
      assert.equal(symbol, 'XTOKEN')
    })
    it('has total supply', async() => {
      const totalSupply = await xToken.totalSupply()
      assert.equal(totalSupply.toNumber(), 1000)
    })
    it('allocates initial supply to admin account', async() => {
      const adminBalance = await xToken.balanceOf(accounts[0])
      assert.equal(adminBalance.toNumber(), 1000)
    })
  })

  describe('token transfer', async () => {

//    it('token transfer reverts', async () => {
      //  await truffleAssert.reverts(
        //  xToken.transfer(accounts[1], 4000),
      //    "insufficient balance to make transfer"
  //  );
  //  })

      it('approves tokens for delegated transfer', async() => {
        const approve = xToken.approve.call(accounts[1], 100);
        assert.equal(approve, 'true')
      })
  })

})
