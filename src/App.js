import './App.css';
import React, {Component} from 'react';
import Web3 from 'web3';
import XToken from './src/build/contracts/xToken.json'

class App extends Component {
  async componentWillMount() {
      await this.loadWeb3()
      await this.loadBlockChainData()
    }
  async loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
    }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    }
      else{
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
}
async loadBlockChainData(){
  const web3 = window.web3

  //load accounts
  const accounts = await web3.eth.getAccounts()
  this.setState({account: accounts[0]})

  //Get Network ID
  const networkId = await web3.eth.net.getId()
  const networkData = XToken.networks[networkId]
  if(networkData){
    //load smart contrcat proper
   const xToken = new web3.eth.Contract(XToken.abi, networkData.address)
    //set contracts state
    this.setState({xToken: xToken})
} else{
 window.alert('contract was not deployed to test network.')
}

this.setState({loading:  false})

}
constructor(props) {
  super(props)
  this.state = {
    account: '',
    loading: true
  }
}
  render(){
    return(
      <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small><a className="nav-link" href="#"><span id="account"></span></a></small>
          </li>
        </ul>
      </nav>
      <br></br>
      <blockquote className="blockquote text-center">
      <p className="mb-0"> <strong>XTOKEN ICO SALE</strong></p>
      <footer className="blockquote-footer">Huncho J</footer>
      </blockquote>
      </div>
    );
  }

}

export default App;
