const Products = artifacts.require('./Products.sol')

require('chai').use(require('chai-as-promised')).should()
const truffleAssertions = require('truffle-assertions')

let products

contract('Products', () => {

	describe('deployment', async () => {
		before('Products deployment setup', async () => {
			products = await Products.new('3KVQF2', 1, '0x123456789123456789123456789')
		})

		it('deploys succesfully', async () => {
			const address = await products.address

			assert.notEqual(address, 0x0)
			assert.notEqual(address, '')
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)
		})

		it('has one product', async () => {
			const product = await products.products('3KVQF2')

			assert.equal(product.hash, '0x123456789123456789123456789', 'hash is correct')
			assert.equal(product.id.toNumber(), 1, 'id is correct')
		})
	})

	describe('Add product', async () => {
		before('Add product setup', async () => {
			products = await Products.new('F24I25', 1, '0x123456789123456789123456789')
		})
		/**
         * Ensures that the smart contract is capable to add a product with all the valid fields and
         * the event with the product hash is emmited.
         */
		it('[Add product] Happy path', async() => {
			let productTest = {
				verificationCode: '9FMJ3E',
				productId: 11,
				productHash: '8e45fbad2a1f77af3ee95973527a93976d072afc'
			}

			let tx = await products.addProduct(productTest.verificationCode, productTest.productId, productTest.productHash)
			let proofProduct = await products.products('9FMJ3E')

			assert.equal(productTest.productHash, proofProduct.hash)
			assert.equal(productTest.productId, proofProduct.id.toNumber())

			truffleAssertions.eventEmitted(tx, 'ProductAdded', (event) => {
				return event._productHash === productTest.productHash
			})

		})

		/**
         * Ensures that the smart contract is capable to reject an add product request when the product parameters
         * are invalid.
         */
		it('[Add product] Invalid parameters', async() => {
			// Empty verification code
			await products.addProduct('', 11, '8e45fbad2a1f77af3ee95973527a93976d072afc').should.be.rejected
			// Empty product hash
			await products.addProduct('9FMJ3E', 11, '').should.be.rejected
			// Empty verification code and product hash
			await products.addProduct('', 11, '').should.be.rejected

			// Null verification code
			await products.addProduct(null, 11, '8e45fbad2a1f77af3ee95973527a93976d072afc').should.be.rejected
			// Null verification code and product ID
			await products.addProduct(null, null, '8e45fbad2a1f77af3ee95973527a93976d072afc').should.be.rejected
			// Null verification code, product ID and product hash
			await products.addProduct(null, null, null).should.be.rejected

			// Verification code with less than 6 characters (5 characters)
			await products.addProduct('9FMJ3', 11, '8e45fbad2a1f77af3ee95973527a93976d072afc').should.be.rejected
			// Verification code with more than 6 characters (16 characters)
			await products.addProduct('9FMJ3ER5PD5W41AW', 11, '8e45fbad2a1f77af3ee95973527a93976d072afc').should.be.rejected
		})

	})
})
