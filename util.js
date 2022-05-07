const { Messages } = require("bitcore-p2p");

/**
 * Initialize object of Messages class.
 * used to create messages to interact with the connected nodes.
 */
const msg = new Messages();

/**
 * Function to parse and perform operations on transaction object.
 * @param {Object} tx - bitcoin transaction object. 
 */
const getTransactionData = (tx) => {
  // console.log(tx);
  let totalOutputBTC = 0;
  tx.outputs.forEach(output => {
    totalOutputBTC += output.satoshis;
  });
  console.log(`*** TRANSACTION ***`);
  console.log(`transaction hash: ${tx.hash}`);
  console.log(`transaction inputs: ${tx.inputs.length}`);
  console.log(`transaction outputs: ${tx.outputs.length}`);
  console.log(`total output BTC: ${1e-8 * totalOutputBTC}`);
  console.log(`********************`);
};

/**
 * Function to parse and perform operations on the inventory array.
 * @param {Object} peer - node you will be receiving data from 
 * @param {Object} inventory - inventory array to parse.
 */
const parseInventoryVectors = (peer, inventory) => {
  console.log(`size of received inventory array: ${inventory.length}`);
  // we parse the array of inventory vectors that we receive in Inventory Message.
  inventory.forEach(vector => {
    if (vector.type == 1) {
      // we send "getdata" message to the node, on receiving inventory vector of type 1 (bitcoin transaction or tx)
      let getDataTransaction = msg.GetData.forTransaction(vector.hash);
      peer.sendMessage(getDataTransaction);
    } else if (vector.type == 2) {
      // we send "getdata" message to the node, on receiving inventory vector of type 2 (block)
      let getDataBlock = msg.GetData.forBlock(vector.hash);
      peer.sendMessage(getDataBlock);
    }
  });
};

/**
 * Function to parse and perform operation on block object. 
 * @param {Object} block - block object.
 */
const getBlockData = (block) => {
  const blockHeader = block.header;
  console.log(`*** BLOCK ***`);
  console.log(`current block's hash: ${blockHeader.hash}`);
  console.log(`previous block's hash: ${blockHeader.prevHash}`);
  console.log(`block nonce: ${blockHeader.nonce}`);
  console.log(`number of transactions in block: ${block.transactions.length}`);
  console.log(`*************`);
};

module.exports = {
  getTransactionData,
  parseInventoryVectors,
  getBlockData
};