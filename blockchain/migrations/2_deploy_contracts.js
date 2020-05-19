const ProductContract = artifacts.require('Products.sol')

module.exports = (deployer) => {
	deployer.deploy(ProductContract, "HXSB44", 1, "0x123456789123456789123456789");
}
