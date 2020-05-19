pragma solidity ^0.5.16;

contract Products{

    // Mapping of products
    mapping(string => Product) public products;

    // STRUCTS --------------------------------------------------------------------------------

    struct Product{
        string hash;
        uint256 id;
    }

    // EVENTS ---------------------------------------------------------------------------------

    /**
        This event is emmited when a product is registered.
     */
    event ProductAdded(string _productHash);

    //This contract will be initialized with one product
    constructor(string memory _verificationCode, uint256 _id, string memory _hash) public {
        products[_verificationCode] = Product(_hash, _id);
    }

    //Checks the hash length is 16
    modifier hashLength(string memory _hash){
        require(bytes(_hash).length==16, 'The length has to be 16');
        _;
    }

    /**
        This function register a product in the blockchain. If no errors occur, emmits an event with the product hash.
        It will fail if either _verificationCode and _productHash are empty strings.
     */
    function addProduct(string memory _verificationCode, uint256 _productId, string memory _productHash) public {
        require(bytes(_verificationCode).length > 0, 'Can not add the product, verification code is empty.');
        require((bytes(_verificationCode).length == 6),
            'The verification code must have 6 characters');

        require(bytes(_productHash).length > 0, 'Can not add the product, product hash is empty');

        products[_verificationCode] = Product(_productHash, _productId);

        emit ProductAdded(_productHash);
    }

}
