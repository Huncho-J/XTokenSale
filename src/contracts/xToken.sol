pragma solidity ^0.5.0;

contract XToken{

   uint public totalSupply;
   string public name = "xToken";
   string public symbol = "XTOKEN";

   mapping(address => uint) public balanceOf;
   mapping(address => mapping(address => uint256)) public allowance;

   event Transfer(
       address indexed _from,
       address indexed _to,
       uint256 _value
   );

    event Approval(
       address indexed _owner,
       address indexed _spender,
       uint256 _value
   );
  constructor (uint _initialSupply) public {
       totalSupply = _initialSupply;

       //allocate the initial totalSupply
       balanceOf[msg.sender] = _initialSupply;
   }
   function transfer(address _to, uint _value) public returns(bool success) {
       require(balanceOf[msg.sender] >= _value, "insufficient balance to make transfer");

       //transfer XTOKEN
       balanceOf[msg.sender] -= _value;
       balanceOf[_to] += _value;

       //release transfer event
       emit Transfer(msg.sender, _to, _value);
       return true;
   }

   //approve
   function approve(address _spender, uint256 _value) public returns(bool success) {
       //Allowance
       allowance[msg.sender][_spender] = _value;

       emit Approval(msg.sender, _spender, _value);
       return true;
   }

   function TransferFrom(address _from, address _to, uint _value) public returns(bool success){
       require(_value <= balanceOf[_from], "insufficient balance to make transfer");
       require(_value <= allowance[_from][msg.sender], "Not enough tokens to spend from Allowance");
       balanceOf[_from] -= _value;
       balanceOf[_to] += _value;
       allowance[_from][msg.sender] -= _value;
       emit Transfer(_from, _to, _value);

       return true;

   }


}
