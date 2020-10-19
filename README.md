# **simple-token (Overview)**
An example of smart contract utilization as automated-bank. Can perform simple deposit/withdraw to an automated-bank. <br>
Tested on Windows. <br>
[Here is the site](https://ekasulistyawan.github.io/simple-token/dapp/)

# **Preresquite**
### Smart Contract Development:
1. NodeJS
2. Truffle, used to compile and test the Smart Contract.
3. Ganache CLI, used as local blockchain server for testing. 
4. Remix IDE, used to deploy the Smart Contract to Ethereum Testnet.
### Decentralized Application (soon):
1. Metamask, used as Web3 Injection and Ethereum account management.
2. Lite-Server for testing.

# Testing
### Truffle Instalation:
(Skip this if you already have truffle) Open CMD and run `npm install -g truffle`
### Ganache Instalation:
(Skip this if you already have truffle) Open CMD and run `npm install -g ganache-cli`
### Testing (automatically on Truffle):
1. Proceed to the simple-token directory.
2. Open CMD and run `truffle init`
### Testing (manually on Remix IDE):
1. Proceed to [Remix](https://remix.ethereum.org/)
2. Upload the contracts `.sol`

# Wallet Preparation
### Ethereum Wallet Preparation:
0. Skip this if you already have the 12-word Mnemonic Phrase.
1. Proceed to [MyEtherWallet](https://www.myetherwallet.com/create-wallet)
2. Choose `By Mnemonic Phrase`. Remember all of the 12-word, soon it will be used to import your Eth Wallet.
### Connecting Ethereum Account to Metamask
0. (Skip this if you already installed metamask) Download [here](https://metamask.io/download.html)
1. Open Metamask.
2. Import your account using 12-word Mnemonic Phrase.

# Decentralized Application (dApp)
### NPM Lite-Server Preparation
1. Run `npm init` in simple-token directory.
2. Set `package-json` as the initial `main` configuration.
3. Run `npm install lite-server --save-dev` to install lite-server.
4. Make sure the `dev: lite-server` attribute under `scripts` in `package.json`.
5. Make sure the `bs-config.json` goes to `./dapp` directory.
Note: This repository not include `node_modules` upon `lite-server` installation.
### Running Website
Run `npm run dev` <br>
:warning: **You may reload the page several times to see the result.** <br> 
:warning: **Be careful with Pending/Unsucess transaction, Always monitor the transaction through Metamask.** <br>
(Repaired Soon)
