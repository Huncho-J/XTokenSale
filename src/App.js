import './App.css';
import { ProgressBar, Button } from '../node_modules/react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import Web3 from 'web3';
import XToken from './src/build/contracts/xToken.json'
import XTokenSale from './src/build/contracts/tokenSale.json'

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

  //Load TokenSale SmartContract
  const tokenSaleData = XTokenSale.networks[networkId]
  if(tokenSaleData){
      const tokenSale = new web3.eth.Contract(XTokenSale.abi, tokenSaleData.address)
      this.setState({tokenSale: tokenSale})
      let xTokenPrice = await tokenSale.methods.tokenPrice().call()
      this.setState({xTokenPrice: xTokenPrice.toString()})
      let xTokenSold = await tokenSale.methods.tokensSold().call()
      this.setState({xTokenSold:xTokenSold.toString()})

      const tokenSaleAccount = tokenSaleData.address
      this.setState({tokenSaleAccount:tokenSaleAccount})

      console.log(tokenSaleData.address)
  } else{
      window.alert('contract was not deployed to test network.')
  }

    //load xToken smart contract
    const xTokenData = XToken.networks[networkId]
    if(xTokenData){
     const xToken = new web3.eth.Contract(XToken.abi, xTokenData.address)
      this.setState({xToken: xToken})
      let xTokensAvailable = await xToken.methods.totalSupply().call()
      this.setState({xTokensAvailable: xTokensAvailable})
      let userBalance = await xToken.methods.balanceOf(accounts[0]).call()
      this.setState({userBalance: userBalance})
      console.log(userBalance)
  } else{
   window.alert('contract was not deployed to test network.')
  }
this.setState({loading:false})
}

buyTokens = (numberOfTokens) =>{
  this.setState({loading: true})
  this.state.tokenSale.methods.buyToken(numberOfTokens).send({
    from:this.state.account,
    value: this.state.xTokenPrice * numberOfTokens,
    gas: 50000})
}
constructor(props) {
  super(props)
  this.state = {
    account: '',
    tokenSaleAccount:'',
    tokenSale: {},
    xToken:null,
    xTokenPrice:0,
    tokenSaleBalance:0,
    xTokenSold:0,
    xTokensAvailable:0,
    loading: true
  }
}

  render(){
    let content
   if(this.state.loading){
     content = <p id= "loader" className = "text-center">Loading...</p>
   }

  const percentage = (this.state.xTokenSold / this.state.xTokensAvailable) * 100
    return(
      <div>
      <br></br>
        <blockquote className="blockquote text-center">
          <h1 className="mb-0"> <strong>XTOKEN ICO SALE</strong></h1>
            <footer className="blockquote-footer">Huncho J</footer>
      </blockquote>
      <div className="col-lg-12 d-flex justify-content-center">
        <form  onSubmit={(event) => {
          event.preventDefault()
          let numberOfTokens
          numberOfTokens = this.numberOfTokens.value.toString()
          numberOfTokens = window.web3.utils.toWei(numberOfTokens, 'Ether')
          this.buyTokens(numberOfTokens)
      }}>
     <p  className= "text-center">XToken price is {this.state.xTokenPrice} ether</p>
        <input className="form-control"
          id="numberOfTokens"
          type='number'
          ref={(input) => {this.numberOfTokens = input }}
          placeholder="1"
     />
      <button type="submit" className="btn btn-primary btn-block"> Buy XToken</button>
  <br></br>
  <div className="progressBar">
   <ProgressBar now={percentage} label={`${percentage}% completed`} />
  </div>
     </form>
  </div>
  <div className="container">
   <p><span className="tokens-sold"></span>{this.state.xTokenSold}/{this.state.xTokensAvailable} <span className= "tokens-available"></span> tokens sold</p>
   <p className= "text-muted"> Your Account Balance: {this.state.userBalance}</p>
    <p className= "text-muted" id="account">Your account address: {this.state.account}</p>
      </div>
    </div>
    );
  }

}

export default App;
