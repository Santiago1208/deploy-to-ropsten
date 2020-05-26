# deploy-to-ropsten
This is a mini project which show the way that a Blockchain project made using truffle could be deployed to the Ropsten test net.

## Blockchain set up
1. `cd blockchain`

2. Install dependencies `npm install`

3. Touch the `.env` file at the root of the `blockchain` folder. `touch .env`

4. Create a project in Infura and set the `INFURA_PROJECT_ID, INFURA_PROJECT_SECRET, INFURA_ROPSTEN_URL` environment variables.

5. Generate a wallet with some accounts and set the `DEVELOP_WALLET_MNEMONIC` environment variable. You have two options.

	**Option 1: Use an online wallet generator**
	5.1. Go to the [Wallet generator page](https://iancoleman.io/bip39/#english).

	5.2. Change the **Coin** setting to **ETH - Ethereum**.

	5.3. (Optional) change the **number of words** of the wallet.

	5.4. Click **Generate** at the top of the page.

	5.5. Copy and paste the **BIP39 Mnemonic** to the environment variable, and go to the step 6. Don't close the tab. We will use it later.

	**Option 2: Use Ganache**
	5.1. Open Ganache Desktop.

	5.2. Choose the **Quickstart option**

	5.3. Copy the 12 words of the generated wallet to the environment variable, and go to the step 6. Don't close the window. We will use it later.

6. Pick an account address from your wallet and request some Ether from a faucet. This step is always required. It doesn't matter if you generated your wallet from Ganache and you see you have some Ethers in your accounts. Those Ethers are valid only to run transactions in localhost, but not in the Ropsten net.the [Ropsten faucet]().
	**If you have been taken the option 1 of the step 5, do this**
	6.1. If you closed the tab, change the **Coin** setting to **ETH - Ethereum** and paste the 12 words in the **BIP39 Mnemonic** input. Don't click generate. When you paste the Mnemonic your wallet will be regenerated automatically.

	6.2. Scroll down until the **Derived Addresses** section. There are the account addresses of the wallet.

	6.3. Copy to your notepad an **Address** and its **Private Key**

	6.4. Go to the [faucet](https://faucet.ropsten.be/), paste the **account address** in the input and click on **Send me test Ether**

	6.5. Wait until your account balance change from 0 to 1 ETH. It could take at most 1 hour. Trace your request in [Etherscan](https://ropsten.etherscan.io/) and search by the account address or transaction hash. Once all ok, go to the step 7.

	**If you have been taken the option 2 of the step 5, do this**
	6.1. If you closed the Ganache's window, you made a mistake because you lost your wallet (quickstart doesn't persist the wallet, like **Create Workspace** do), return to the step 5. Otherwise continue with the step 6.2.

	6.2. Copy to your notepad an **Address** and its **Private Key** (It will be found clicking the **Key** icon in the account's row).

	6.3. Go to the [faucet](https://faucet.ropsten.be/), paste the **account address** in the input and click on **Send me test Ether**

	6.4. Wait until your account balance change from 0 to 1 ETH. It could take at most 1 hour. Trace your request in [Etherscan](https://ropsten.etherscan.io/) and search by the account address or transaction hash. Once all ok, go to the step 7.

**Note:** If the faucet didn't work, explore the possibility to get some test Ether from this other faucets:
- https://faucet.kyber.network/
- https://faucet.metamask.io/

7. Compile the smart contract `truffle compile`

8. Test the smart contract. Open Ganache (the development network) and execute `truffle test`

9. Deploy the contract `truffle migrate --network ropsten`

10. Copy to the clipboard the address where the smart contract was deployed.

## Backend set up
1. `cd backend`

2. Install dependencies `npm install`

3. Touch the `.env` file at the root of the `backend` folder. `touch .env`

4. Paste to the `CONTRACT_ADDRESS` environment variable the contract's address in the clipboard.

5. Copy and paste to the `.env` file the `INFURA_ROPSTEN_URL, DEVELOP_WALLET_MNEMONIC` environment variables of `blockchain/.env`.

6. From your wallet pick the funded account address and its private key (it is an hex) and set the `ACCOUNT_PRIVATE_KEY, ACCOUNT_ADDRESS` environment variables.

7. Run the backend `node useContracts.js`

8. In the transaction receipt, idenfity the `transactionHash` attribute and copy its value to the clipboard. Go to [Ropsten Etherscan](https://ropsten.etherscan.io/) and search that hash.

9. Read the details of the transaction and inspect the `to` value of the receipt (it must be and hex and be the same of the smart contract's address). Once there, inspect the events emmited by that contract.
