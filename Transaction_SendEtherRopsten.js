var Tx = require("ethereumjs-tx");
let Web3 = require("web3");
const rcpUrl = "https://ropsten.infura.io/v3/837e1103af5f4974a94745edb1021c77";

let web3 = new Web3(rcpUrl);

const account1 = "0xc2F57fa1854b9eA2E5189FcD0e45C7670fd49859";
const account2 = "0xB36818759dF4D82A96F3160c4cf97547E77B3988";

const privatekey1 =
  "B8C6D1083BF255CBA81127CC9D6FE7C4D379F49050B4FC4471E40771B6D182EB";
const privatekey2 =
  "4F58B54C1706F8F6C91AF9943E844949459087952B644C3FD91D6EDBCC4F942C";

const privateKey1Buffer = Buffer.from(privatekey1, "hex");
const privateKey2Buffer = Buffer.from(privatekey2, "hex");

web3.eth.getTransactionCount(account1, (err, txCount) => {
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei("1", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };

  const tx = new Tx.Transaction(txObject, {
    chain: "ropsten",
    hardfork: "petersburg",
  });
  tx.sign(privateKey1Buffer);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});
