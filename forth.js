// Updating or doing new transactions on web application and connecting to web3
var Tx = require("ethereumjs-tx");
const Web3 = require("web3");
const { Buffer } = require("buffer");
const rcpUrl = "http://127.0.0.1:7545";
const web3 = new Web3(rcpUrl);
// console.log(web3);

const account1 = "0xc0C4dD515982f1BBF99E90BA27B8302bC73d9835";
const account2 = "0x6AdE6383Bd7fddC54dE6b7f26aa9f71BcfE7AB58";

const privateKey1 =
  "9425eb9a6f656de7d3c52391112ff4f0d29072ac3e723115a618638b3392a8be";
const privateKey2 =
  "2ac8a918aa5207f2419b49b9ddb275eb59e429a3a5474dc981343d184a5abe97";

const privateKeyBuffer1 = Buffer.from(privateKey1, "hex");
const privateKeyBuffer2 = Buffer.from(privateKey2, "hex");

// console.log("Buffer 1", privateKeyBuffer1);
// console.log("Buffer 2", privateKeyBuffer2);

// Function to send ether from one account to another

web3.eth.getTransactionCount(account1, (err, txCount) => {
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei("1", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };

  const tx = new Tx.Transaction(txObject);
  tx.sign(privateKeyBuffer1);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  //   console.log("Tx =", tx);
  //   console.log("SerializedTx =", serializedTx);
  //   console.log("Raw =", raw);

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});
