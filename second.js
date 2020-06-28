// Connecting to infura and getting balance of metamask account.

let rcpUrl = "https://ropsten.infura.io/v3/837e1103af5f4974a94745edb1021c77";
let web3 = new Web3(rcpUrl);

let address = "0xB36818759dF4D82A96F3160c4cf97547E77B3988";

web3.eth.getBalance(address, (err, wei) => {
  if (err) console.log("There is an error");
  else {
    let balance = web3.utils.fromWei(wei, "ether");
    console.log("Your current balance is :", balance, "eth");
  }
});
