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

   it('token transfer reverts', async () => {
        await truffleAssert.reverts(
          xToken.transfer.call(accounts[1], 4000, {from: accounts[0]}),
          "insufficient balance to make transfer"
      );

    })
    it('transfers xTokens',async () =>{
      xToken.transfer(accounts[1], 5,{from: accounts[0]})
      const account1 = await xToken.balanceOf(accounts[1]);
      assert.equal(account1.toNumber(), 5, 'it transfers xtokens')
    })

      it('returns true for approval', async() => {
         const approved = await xToken.approve.call(accounts[1], 100, {from: accounts[0]});
        assert.equal(approved, true, 'it returns true')
      })
      it('approves tokens for delegated transfer', async() => {
         const approved = await xToken.approve(accounts[1], 100, {from: accounts[0]});
         const event = approved.logs[0].args
         assert.equal(event._owner, accounts[0], 'Logs the correct  account')
         assert.equal(event._spender, accounts[1], 'Logs correct approved account')
         assert.equal(event._value.toNumber(), 100, '_Value is correct')
      })
      it('handles delegated transfers', async() => {
         //test require statements
         fromAccount = accounts[2];
         toAccount = accounts[3];
         spendingAccount = accounts[4];
         xToken.transfer(fromAccount, 10,{from: accounts[0]});
         xToken.approve(spendingAccount, 5,{from: fromAccount});
         await truffleAssert.reverts(
           xToken.TransferFrom(fromAccount,toAccount,4000, {from: spendingAccount}),
           "insufficient balance to make transfer"
       );
       const success = await  xToken.TransferFrom(fromAccount,toAccount,5, {from: spendingAccount});
       const event = success.logs[0].args
       assert.equal(event._from, accounts[2], 'Logs the correct from account')
       assert.equal(event._to, accounts[3], 'Logs correct reciever account')
       assert.equal(event._value.toNumber(), 5, '_Value is correct')
      })
  })

})
