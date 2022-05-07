/**
 * We use Peer and Messages class for writing the code to
 * interact with a Peer/Node in the bitcoin P2P network
 */
const { Peer, Messages } = require("bitcore-p2p");

/**
 * The node that we would be connecting to.
 * We create a Peer object and pass in the IP address of the node we would be connecting to.
 * Peer class uses default port 8333 to connect to the node.
 */
const peer = new Peer({ host: "65.175.243.159" });

/**
 * Initialize object of Messages class.
 * used to create messages to interact with the node.
 */
let msg = new Messages();

/**
 * this event is invoked first upon calling the connect method on peer object
 */
peer.on('ready', () => {
  console.log(peer.version, peer.subversion, peer.bestHeight);
});

/**
 * Event that listens to the Inventory Messages.
 */
peer.on('inv', (message) => {
  const inventory = message.inventory;
  // we parse the array of inventory vector that we receive in Inventory Message.
  inventory.forEach(vector => {
    if (vector.type == 1) {
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
 * Event that listen to Transaction Messagse.
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
 * Event that listens to Block Messages.
 */
peer.on('block', (message) => {
  let block = message.block.toObject();
  console.log(block);
});

/**
 * Event emitted upon disconnecting from the peer.
 */
peer.on('disconnect', () => {
  console.log('connection closed');
});

/**
 * initiates a connection the peer asynchornously
 */
peer.connect();