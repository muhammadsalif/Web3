// Conneting to ganache and checking balance of ganache account
const rpcURL = "http://127.0.0.1:7545";

let web3 = new Web3(rpcURL);
let address = "0x6dC20fb827D552B232bEA6A0e0424e51e76f3E5b";

web3.eth.getBalance(address, (err, wei) => {
  if (err) console.log("There is an error", err);
  else {
    let balance = web3.utils.fromWei(wei, "ether");
    console.log("Your account balance is :", balance, "ether");
  }
});
