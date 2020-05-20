# deploy-to-ropsten
This is a mini project which show the way that a Blockchain project made using truffle could be deployed to the Ropsten test net.

## Blockchain set up
1. Install dependencies
`npm install`

2. Touch the `.env` file at the root of the `blockchain` folder.
`touch .env`

3. Create a project in Infura and set the `INFURA_PROJECT_ID, INFURA_PROJECT_SECRET, INFURA_ROPSTEN_URL` environment variables.

4. Generate a wallet with some accounts and set the `DEVELOP_WALLET_MNEMONIC` environment variable. You can use Ganache or an online wallet generator like [this](https://iancoleman.io/bip39/#english). Remember that the wallet's mnemonic is a set of 12 - 15 space-separated words (usually in english).

5. Pick an account address from your wallet and request some Ether from the [Ropsten faucet](https://faucet.ropsten.be/).

6. Compile the smart contract
`truffle compile`

7. Test the smart contract. Open Ganache (the development network) and execute the command below.
`truffle test`

8. Deploy the contract
`truffle migrate --network ropsten`

9. Copy to the clipboard the address where the smart contract was deployed.

## Backend set up
1. Install dependencies
`npm install`

2. Touch the `.env` file at the root of the `backend` folder.
`touch .env`

3. Copy and paste to the `.env` file the `INFURA_ROPSTEN_URL, DEVELOP_WALLET_MNEMONIC` environment variables.

4. From your wallet pick the funded account address and its private key (it is an hex) and set the `ACCOUNT_PRIVATE_KEY, ACCOUNT_ADDRESS` environment variables.

5. Run the backend
`node useContracts.js`
