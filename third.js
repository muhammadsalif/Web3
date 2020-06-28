//  Reading Data from Smart Contracts with Web3.js using infura

// let Web3 = require("web3");
let rcpUrl = "https://ropsten.infura.io/v3/837e1103af5f4974a94745edb1021c77";
let web3 = new Web3(rcpUrl);
let address = "0xdb855686518Acf5a4CC9dB4773894248634a6506";

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

const contract = new web3.eth.Contract(abi, address);
// console.log(contract);
// console.log("Contract", contract);
// console.log("Methods", contract.methods);
// console.log("Get Age method", contract.methods.getAge);

let age = contract.methods.getAge().call(function (err, result) {
  console.log("Age is:", result);
});

let work = contract.methods.doSomeWork().call(function (err, result) {
  console.log("Calling do someWork of remix: ", result);
});
