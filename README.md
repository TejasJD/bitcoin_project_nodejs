# PROG9812, Assignment 3 Option B, Bitcoin Transaction Viewer
### Tejas Dusane, D21124891, TU059-ASD.
A bitcoin transaction viewer written in node.js.
## Prerequisites
Prerequisites along with their versions used in this project.
- [Node.js](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x64.msi) (16.14.2).
- Node Package Manager (npm) (8.7.0).
- Yarn (1.22.18).
## Setting up
### Windows
- Install Node.js from the link in prerequisites. 
- Once installed, type the given commands in command prompt. Confirm the installation by typing ```node -v```. Node.js installed through this link of windows would come with a Node Package Manager (npm). Verify its installation by typing ```npm -v```.
- To install yarn, type ```npm install --global yarn``` in the command prompt. If installed successfully, Verify by typing ```yarn -v```.
### Linux
- Follow the **Option 3 — Installing Node Using the Node Version Manager** section [here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04).
## Running the code
- Type the commands below in command prompt or terminal.
- Download the repository from Github. Alternatively, if you have git installed on your system, you can run the command ```git clone  https://github.com/TejasJD/bitcoin_project_nodejs```.
- Type ```npm install``` or ```yarn``` to install dependencies to run the code.
- Type ```npm run start``` or ```yarn start``` to run the code.
- If there is a connection error while connecting to the peer node, change the IP address (host field in the object) in the line ```const peer = new Peer({ host: "65.175.243.159" });``` in [index.js](index.js). IP address of the nodes can be found by doing a DNS lookup on the bitcoin lookup domain **seed.bitcoin.sipa.be**. Type ```dig seed.bitcoin.sipa.be``` in terminal (Linux / WSL) to do DNS lookup. Alternatively you can use this [link](https://mxtoolbox.com/DNSLookup.aspx) and type in the special lookup domain to a retrieve list of reliable addresses.