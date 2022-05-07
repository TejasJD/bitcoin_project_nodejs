const p2p = require("bitcore-p2p");

const Peer = p2p.Peer;
const Messages = p2p.Messages;

// connecting to a node on the bitcoin network, it uses default port for bitcoin connection 8333
const peer = new Peer({host: "65.175.243.159"});

// initialize the object of class Messages
let msg = new Messages();

/**
 * this event is invoked first upon calling the connect method on peer object
 */
peer.on('ready', () => {
  console.log(peer.version, peer.subversion, peer.bestHeight);
});

/**
 * adding an event to the peer for Inventory messages 'inv'
 * we parse the inventory messages and based on the type of Inventory vectors
 * we send message to the connected node to get data on:
 *     transactions (type 1 inventory vector)
 *     blocks (type 2 inventory vector)
 */
peer.on('inv', (message) => {
  const inventory = message.inventory;
  // we parse the array of inventory vector that we receive in Inventory Message.
  inventory.forEach(vector => {
    if(vector.type == 1) {
      // we send get_data_transaction message to the node, on receiving inventory vector of type 1
      let getDataTransaction = msg.GetData.forTransaction(vector.hash);
      peer.sendMessage(getDataTransaction);
    } else if (vector.type == 2) {
      // we send get_data_block message to the node, on receiving inventory vector of type 2
      let getDataBlock = msg.GetData.forBlock(vector.hash);
      peer.sendMessage(getDataBlock);
    }
  });
});

/**
 * Event that listen to Transaction Message, the callback parses the transaction message
 */
peer.on('tx', (message) => {
  let tx = message.transaction.toObject();
  let totalBTC = 0;
  tx.outputs.forEach(output => {
    totalBTC += output.satoshis;
  });
  console.log(tx.hash);
  console.log(`This transaction is of ${1e-8 * totalBTC} BTC`);
});
/**
 * Event that listens to Block Message, the callback parses the block message
 */
peer.on('block', (message) => {
  let block = message.block.toObject();
  console.log(block);
});

peer.on('disconnect', () => {
  console.log('connection closed');
});

peer.connect();