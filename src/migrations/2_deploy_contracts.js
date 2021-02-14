const XToken = artifacts.require("./xToken.sol");
const TokenSale = artifacts.require("./tokenSale.sol")

module.exports = async function (deployer) {
  await deployer.deploy(XToken,1000);
	const xToken = await XToken.deployed()

  const tokenPrice = 100;
	await deployer.deploy(TokenSale, xToken.address,tokenPrice)
	const tokenSale = await TokenSale.deployed()

};
