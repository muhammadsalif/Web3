//Listening events of SC using web3

// const Web3 = require("web3");
// WEB Socket let you build communication of two way
const rpcUrl = "wss://ropsten.infura.io/ws/v3/837e1103af5f4974a94745edb1021c77";

const web3 = new Web3(rpcUrl);

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "console",
    type: "event",
  },
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
    stateMutability: "nonpayable",
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

const address = "0xA110517c6Dbc0CD7D36dE8f568739e7155feC481";

const contract = new web3.eth.Contract(abi, address);

contract.methods.getAge().call(function (err, result) {
  console.log("Age is:", result);
});

contract.methods.doSomeWork().call(function (err, result) {
  console.log("Do some work:", result);
});

// The way you can listen the pas events
contract.getPastEvents(
  "AllEvents",
  {
    fromBlock: 0,
    toBlock: "latest",
  },
  (err, events) => {
    console.log("Your events", events);
    console.log("Errors", err);
  }
);

// Two way communication of listening of the events.
contract.events
  .console(
    {
      fromBlock: 0,
    },
    function (error, event) {
      console.log("Event is :", event);
    }
  )
  .on("connected", function (subscriptionId) {
    console.log("Connected", subscriptionId);
  })
  .on("data", function (event) {
    console.log("Data", event); // same results as the optional callback above
  })
  .on("changed", function (event) {
    // remove event from local database
    console.log("Changed", event); // same results as the optional callback above
  })
  .on("error", function (error, receipt) {
    // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    console.log("error", error); // same results as the optional callback above
    console.log("receipt", receipt); // same results as the optional callback above
  });
