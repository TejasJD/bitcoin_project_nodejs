/**
 * We use Peer and Messages class from the bitcore-p2p library 
 * for writing the code to interact with a Peer/Node 
 * in the bitcoin P2P network.
 */
const { Peer, Messages } = require("bitcore-p2p");
const { 
  getTransactionData,
  parseInventoryVectors,
  getBlockData,
} = require("./util.js");

/**
 * The node that we would be connecting to.
 * We create a Peer object and pass in the IP address of the node we would be connecting to.
 * With this constructor, we form connection to the Peer with given IP address and default port (8333).
 */
const peer = new Peer({ host: "35.204.253.254" });
// console.log(peer.port);

/**
 * Initialize object of Messages class.
 * Used to create messages to interact with the connected nodes.
 */
let msg = new Messages();

/**
 * This event is emitted when peer is ready to send and receive data.
 */
peer.on('ready', () => {
  console.log(`peer version: ${peer.version}`);
  console.log(`peer host: ${peer.host}`);
  console.log(`peer port: ${peer.port}`);
  console.log(`peer best height ${peer.bestHeight}`);
  // test message to retrieve information on certain block
  // let getDataBlock = msg.GetData.forBlock("00000000000000000001e72afce2307dd629c8fa658737c3c04ffccc08ac2715");
  // peer.sendMessage(getDataBlock);
});

/**
 * Event that listens to the Inventory Messages.
 */
peer.on('inv', (message) => {
  console.log("*** INVENTORY PAYLOAD RECEIVED ***");
  // The inventory array from Inventory Message, this is an array of inventory vectors.
  const inventory = message.inventory;
  // function to parse the inventory array and send message to the node to retrieve data
  // from each inventory vector.
  parseInventoryVectors(peer, inventory);
});

/**
 * Event that listens to Transaction Messages. This type of message is received
 * in reponse to the "getdata" message that requests data from a transaction hash.
 */
peer.on('tx', (message) => {
  // retrieve transaction object from Transaction Message.
  let tx = message.transaction.toObject();
  getTransactionData(tx);
});

/**
 * Event that listens to Block Messages. This type of message
 * is received in response to the "getdata" message that requests information 
 * from a block hash
 */
peer.on('block', (message) => {
  // retreive "block" object from Block Message.
  let block = message.block.toObject();
  getBlockData(block);
});

/**
 * Event emitted upon disconnecting from the peer.
 */
peer.on('disconnect', () => {
  console.log('connection closed');
});

/**
 * initiates a connection to the peer asynchornously
 */
peer.connect();