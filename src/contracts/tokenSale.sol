pragma solidity ^0.5.0;
import "./xToken.sol";
contract tokenSale{
  address admin;
  xToken public tokenContract;
  uint256 public tokenPrice;

  constructor(xToken _tokenContract, uint256 _tokenPrice) public{
      admin = msg.sender;
      tokenContract = _tokenContract;
      tokenPrice = _tokenPrice;

  }
}
