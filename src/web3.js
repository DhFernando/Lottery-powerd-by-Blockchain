import Web3 from 'web3'


    const provider = new Web3.providers.HttpProvider('http://localhost:7545')
    const web3 = new Web3(provider || Web3.givenProvider); 

export default web3 