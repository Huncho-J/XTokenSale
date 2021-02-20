pragma solidity ^0.5.0;
import "./xToken.sol";
contract tokenSale{
  address payable admin;
  XToken public tokenContract;
  uint256 public tokenPrice;
  uint public tokensSold;

  event SellEvent(
      address _buyer,
      uint _amount
    );

  constructor(XToken _tokenContract, uint256 _tokenPrice) public{
      admin = msg.sender;
      tokenContract = _tokenContract;
      tokenPrice = _tokenPrice;
  }
  function multiply(uint a,uint b) internal pure returns (uint c){
      require(a == 0 || (c = a * b) / a == b);
  }

  function buyToken(uint256 _numberOfTokens) public payable{
      require(msg.value == multiply(_numberOfTokens, tokenPrice));
      require(tokenContract.balanceOf(address(this)) > _numberOfTokens);
      require(tokenContract.transfer(msg.sender, _numberOfTokens));
      tokensSold += _numberOfTokens ;
     emit SellEvent(msg.sender, _numberOfTokens);
  }
  //End token sale
  function endSale() public {
      require(msg.sender == admin);

      //transfer remainiing tokens to admin
      require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));

      //destroy contract after sale end
      selfdestruct(admin);
  }
}
