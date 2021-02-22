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
      //Ensure buyer pays the correct price
      require(msg.value == multiply(_numberOfTokens, tokenPrice));
      //Ensure contract has enough tokens
      require(tokenContract.balanceOf(address(this)) > _numberOfTokens);
      //transfer tokens to buyer
      require(tokenContract.transfer(msg.sender, _numberOfTokens));
      //update number of tokens sold
      tokensSold += _numberOfTokens ;
      //emit sale event
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
