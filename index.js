// Connecting to ganache with require not using web3 files installed
const Web3 = require("web3");

const rpcURL = "http://127.0.0.1:7545";

let web3 = new Web3(rpcURL);

let address = "0x6dC20fb827D552B232bEA6A0e0424e51e76f3E5b";

web3.eth.getBalance(address, function (err, wei) {
  let balance = web3.utils.fromWei(wei, "ether");
  console.log("Your account balance is :", balance, "eth");
});
