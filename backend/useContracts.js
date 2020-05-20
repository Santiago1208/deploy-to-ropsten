const { productsContract, estimateGas, getBalance, sendTransaction } = require('./contracts.config')

const main = async () => {
	let productTest = {
		verificationCode: '9FMJ3E',
		productId: 12,
		productHash: '8e45fbad2a1f77af3ee95973527a93976d072afc'
	}
	// Check the balance of my account
	let balance = await getBalance();
	console.log(balance);

	// Estimate how much gas will cost my transaction (Avoid to consume additional gas)
	let gas = await estimateGas(productsContract.methods.addProduct, productTest.verificationCode, productTest.productId, productTest.productHash);
	console.log(gas);

	try {
		// Fire the business method
		let data = await productsContract.methods.addProduct(productTest.verificationCode, productTest.productId, productTest.productHash).encodeABI();
		console.log(data);

		let result = await sendTransaction(data, gas);
		console.log(result);
	} catch (error) {
		console.error(`There was an error: ${error}`)
	}
} 

main()
