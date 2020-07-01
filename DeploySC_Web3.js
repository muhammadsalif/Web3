//Deploying SC to web 3 and doing transactions.

var Tx = require("ethereumjs-tx");
const Web3 = require("web3");
const { Buffer } = require("buffer");

const rcpUrl = "https://ropsten.infura.io/v3/837e1103af5f4974a94745edb1021c77";
const web3 = new Web3(rcpUrl);
// console.log(web3);

const account1 = "0xc2F57fa1854b9eA2E5189FcD0e45C7670fd49859";
const privatekey1 =
  "B8C6D1083BF255CBA81127CC9D6FE7C4D379F49050B4FC4471E40771B6D182EB";
const privateKey1Buffer = Buffer.from(privatekey1, "hex");

// Three steps :
// 1. Build the transaction.
// 2. Signed the transaction
// 3. Send the transaction

web3.eth.getTransactionCount(account1, (err, txCount) => {
  const data =
    "608060405234801561001057600080fd5b5061019b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063303b519214610046578063967e6e65146100c9578063d5dcf127146100e7575b600080fd5b61004e610115565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561008e578082015181840152602081019050610073565b50505050905090810190601f1680156100bb5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100d1610152565b6040518082815260200191505060405180910390f35b610113600480360360208110156100fd57600080fd5b810190808035906020019092919050505061015b565b005b60606040518060400160405280601781526020017f446f20736f6d6520776f726b2066726f6d2068756d616e000000000000000000815250905090565b60008054905090565b806000819055505056fea26469706673582212203d4061a10edd8f50c0491f546774845afc1798bd75fc896479b4ca7477b0e99464736f6c63430006000033";

  const dataBuffer = Buffer.from(data, "hex");
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    data: dataBuffer,
  };

  const tx = new Tx.Transaction(txObject, { chain: "ropsten" });
  tx.sign(privateKey1Buffer);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("error", err);
    console.log("txHash:", txHash);
  });
});
