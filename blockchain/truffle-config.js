require('dotenv').config()
const TruffleHDWalletProvider = require('truffle-hdwallet-provider');

/* THIS CODE TAKE IN MIND TO SWITCH THE WALLET PASSPHRASE WHEN THE APP GOES TO PRODUCTION.
USUALLY DEVELOPMENT PASSPHRASES ARE INSECURE TO USE IN A PUBLIC BLOCKCHAIN AND ETHERS COULD BE STOLEN

let walletMnemonic = undefined
if (process.env.STAGE === 'production') {
	walletMnemonic = process.env.PRODUCTION_WALLET_MNEMONIC
} else {
	walletMnemonic = process.env.DEVELOP_WALLET_MNEMONIC
}
*/

module.exports = {
	networks: {
		ropsten: {
			provider: () => new TruffleHDWalletProvider(process.env.DEVELOP_WALLET_MNEMONIC, process.env.INFURA_ROPSTEN_URL),
			gas: 4000000,
			gasPrice: 21,
			network_id: 3
		},
		development: {
			host: '127.0.0.1',
			port: 7545,
			network_id: '*' // Match any network ID
		}
	},
	solc: {
		optimizer: {
			enabled: true,
			runs: 200
		}
	}
};
