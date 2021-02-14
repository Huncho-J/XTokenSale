pragma solidity ^0.5.0;

contract xToken{

   uint public totalSupply;
   string public name = "xToken";
   string public symbol = "XTOKEN";

   mapping(address => uint) public balanceOf;

   event Transfer(
       address indexed _from,
       address indexed _to,
       uint256 _value
   );
  constructor (uint _initialSupply) public {
       totalSupply = _initialSupply;

       //allocate the initial totalSupply
       balanceOf[msg.sender] = _initialSupply;
   }
   function transfer(address payable _to, uint _value) public payable returns(bool success) {
       require(balanceOf[msg.sender] >= _value);

       //transfer XTOKEN
       balanceOf[msg.sender] -= _value;
       balanceOf[_to] += _value;

       //release transfer event
       emit Transfer(msg.sender, _to, _value);
       return true;
   }

   //approve
   function approve(address _spender, uint256 _value) public returns(bool success) {

       return true;
   }


}
