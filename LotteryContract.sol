pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public{
        manager = msg.sender;
    }
    
    function randomNumber() private view returns(uint){
        return uint(keccak256(block.difficulty , now , players));
    }
    
    modifier onlyManager(){
        require(msg.sender == manager);
        _;
    }
    
    function enter() public payable{
        require(msg.value > .01 ether); 
        players.push(msg.sender);
    }
    
    function pickWinner() public onlyManager {
        uint index = randomNumber() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }

    function getManager() public onlyManager view  returns( address ){
        return manager;
    }

    function getPlayers() public view  returns( address[] ){
        return players;
    }
    
    
    
}