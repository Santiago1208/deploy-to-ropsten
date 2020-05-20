require('dotenv').config()
const Web3 = require('web3')
const { Transaction } = require('ethereumjs-tx')

//Ropsten URL
const url = process.env.INFURA_ROPSTEN_URL

//Connection to blockchain
const web3 = new Web3(new Web3.providers.HttpProvider(url));

const Products = require('../blockchain/build/contracts/Products.json')

//Address of the smart contract
const address = process.env.CONTRACT_ADDRESS
const productsContract = new web3.eth.Contract(Products.abi, address)

const getAccounts = async () => {
	try {
		let accounts = await web3.eth.getAccounts();
		return accounts;
	} catch (error) {
		console.error(`There was an error: ${error}`)
	}
};

/**
 * 
 * @param {Function} contractFunction 
 * @param  {...any} args 
 */
const estimateGasOfFunction = async (contractFunction, ...args) => {
	try {
		// Here we know we are invoking addProduct() function. We can expect 3 parameters
		let estimatedGas = await contractFunction(args[0], args[1], args[2]).estimateGas()
		return estimatedGas;
	} catch (error) {
		console.error(`There was an error: ${error}`)
	}
};

const getBalance = async () => {
	try {
		// This account belongs to your created wallet. Infura does not manage accounts for security reasons
		// Check https://github.com/ethereumjs/keythereum to improve the account management.
		console.log(process.env.ACCOUNT_ADDRESS);
		let result = await web3.eth.getBalance(process.env.ACCOUNT_ADDRESS)
		return `${web3.utils.fromWei(result, 'ether')} ETH`
	} catch (error) {
		console.error(`There was an error: ${error}`)
	}
}

const sendTransaction = async (data, gas) => {
	try {
		const privateKey = Buffer.from(process.env.ACCOUNT_PRIVATE_KEY, 'hex');
		const ourAccountAddress = process.env.ACCOUNT_ADDRESS;
		const contractAddress = process.env.CONTRACT_ADDRESS;
		let transactionCount = await web3.eth.getTransactionCount(ourAccountAddress)
		// Build the transaction
		let transactionData = {
			nonce: web3.utils.toHex(transactionCount),
			from: ourAccountAddress,
			to: contractAddress,
			gasPrice: web3.utils.toHex(10e9), // 10 Gwei
			gasLimit: web3.utils.toHex(gas),
			data
		}
		let transaction = new Transaction(transactionData, {chain: 'ropsten'});
		transaction.sign(privateKey);
		const serializedTransaction = transaction.serialize().toString('hex');
		const result = await web3.eth.sendSignedTransaction(`0x${serializedTransaction}`)
		return result;
	} catch (error) {
		console.error(`There was an error: ${error}`)
	}
}

module.exports = { productsContract, getAccounts, estimateGas: estimateGasOfFunction, getBalance, sendTransaction }
