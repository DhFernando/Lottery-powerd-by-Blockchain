import React, { useEffect } from 'react'; 
import './App.css';
import lottery from './lottery'
import web3 from './web3'

function App() {

  const [addresses, setAddresses] = React.useState(null);
  const [manager, setManager] = React.useState(null);
  const [players , setPlayers] = React.useState([])
  const [contractBalance , setContractBalance] = React.useState(null)

  const [ enteredEthAmount , setEnteredEthAmount ] = React.useState(0)

  useEffect(()=>{ 
    async function init(){
      setManager(await lottery.methods.getManager().call())
      setAddresses(await web3.eth.getAccounts())

      // get players that when this web load
      setPlayers( await lottery.methods.getPlayers().call() )

      // get contract balane when page load
      setContractBalance( await web3.eth.getBalance(lottery.options.address) )
      
    }
    init()
    
  } , [])

 
      // web3.eth.getBalance(addresses[0] , (err , bal)=> {
      //   console.log(web3.utils.fromWei(bal , 'ether'));
      // })

      // const getItem = async () =>{

      //   console.log(_addresses)
      //   const i = await lottery.methods.getItem( _addresses[2] )
      //   .call()

      //   const j = await lottery.methods.te()
      //   .call()

      //   console.log(i)
      // }

      // const AddItem = async () =>{
      //   await lottery.methods.createPack( _addresses[2] , "Apple2" , 9 , 2 )
      //   .send({from : _addresses[3] , gas:3000000})
      // }




 
  return (
    <div className="App">
        <h2>Block chain Lottery - Powerd by Ethereum with React Js</h2>
        <p> This contract managed by <b>{ manager }</b> </p>
        <p> Currently there are { players.length } competing to win  { contractBalance != null ? web3.utils.fromWei( contractBalance , 'ether') : null } <b>Eth</b> </p>
        <hr />
        <h3>Want to try your luck to day ?</h3>
          Enter Amount to Enter to Game <br /> <input type="number" onChange={ (e) => setEnteredEthAmount( e.target.value ) } />
          { enteredEthAmount > 0.01 ? <button onClick={ async (e)=>{
            e.preventDefault()

            await lottery.methods.enter().send({
              from:addresses[0],
              value : web3.utils.toWei( enteredEthAmount , 'ether')
            })



             // get players  
            setPlayers( await lottery.methods.getPlayers().call() )

            // get contract balane  
            setContractBalance( await web3.eth.getBalance(lottery.options.address) )

          } } > Enter to luck </button> : null }
        <br />

        
        {/* { getItem() } */}
    </div>
  );
}

export default App;
