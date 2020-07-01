// Setting age to fucntion by sending transaction to contract

var Tx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
const { Buffer } = require("buffer");

const rcpUrl = "https://ropsten.infura.io/v3/837e1103af5f4974a94745edb1021c77";
const web3 = new Web3(rcpUrl);
// console.log(web3);

const account1 = "0xc2F57fa1854b9eA2E5189FcD0e45C7670fd49859";

const privatekey1 =
  "B8C6D1083BF255CBA81127CC9D6FE7C4D379F49050B4FC4471E40771B6D182EB";

const privateKey1Buffer = Buffer.from(privatekey1, "hex");

const contractAddress = "0xdb855686518Acf5a4CC9dB4773894248634a6506";

let abi = [
  {
    inputs: [],
    name: "doSomeWork",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getAge",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
    ],
    name: "setAge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contract = new web3.eth.Contract(abi, contractAddress);

web3.eth.getTransactionCount(account1, (err, txCount) => {
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    to: contractAddress,
    data: contract.methods.setAge(12).encodeABI,
  };

  const tx = new Tx.Transaction(txObject, { chain: "ropsten" });
  tx.sign(privateKeyBuffer1);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});
