/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides, Signer, utils } from "ethers";
import type { PromiseOrValue } from "../../common";
import type { Hermes, HermesInterface } from "../../contracts/Hermes";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_drachma",
        type: "address",
      },
      {
        internalType: "address",
        name: "_olympus",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "lender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "AddListing",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Borrow",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Liquidate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "RemoveListing",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "RemoveLoan",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint48",
        name: "duration",
        type: "uint48",
      },
    ],
    name: "addListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "agreed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "borrow",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "calculateCollateral",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "calculateInterest",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "drachma",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "liquidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "listings",
    outputs: [
      {
        internalType: "address",
        name: "lender",
        type: "address",
      },
      {
        internalType: "uint48",
        name: "duration",
        type: "uint48",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "loans",
    outputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "lender",
        type: "address",
      },
      {
        internalType: "bool",
        name: "borrowerClaimed",
        type: "bool",
      },
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "uint48",
        name: "startTime",
        type: "uint48",
      },
      {
        internalType: "uint48",
        name: "duration",
        type: "uint48",
      },
      {
        internalType: "uint256",
        name: "collateral",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "olympus",
    outputs: [
      {
        internalType: "contract IERC721",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "payoff",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "removeListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "topup",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_prices",
        type: "uint256[]",
      },
    ],
    name: "updatePrices",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c06040523480156200001157600080fd5b50604051620026693803806200266983398101604081905262000034916200018c565b6200003f336200011f565b6000805460ff60a01b191690556001600160a01b038216620000a85760405162461bcd60e51b815260206004820152601960248201527f5b4865726d65735d3a20496e76616c696420616464726573730000000000000060448201526064015b60405180910390fd5b6001600160a01b038116620001005760405162461bcd60e51b815260206004820152601960248201527f5b4865726d65735d3a20496e76616c696420616464726573730000000000000060448201526064016200009f565b6001600160601b0319606092831b8116608052911b1660a052620001c4565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146200018757600080fd5b919050565b60008060408385031215620001a057600080fd5b620001ab836200016f565b9150620001bb602084016200016f565b90509250929050565b60805160601c60a05160601c61242562000244600039600081816105660152818161089601528181610ce501528181610df40152818161101a015281816114f70152818161164f01526118930152600081816102570152818161068a0152818161090e01528181610c22015281816110a901526114b801526124256000f3fe6080604052600436106101405760003560e01c80637cdb808d116100b6578063dd99410d1161006f578063dd99410d146103b5578063de74e57b146103d5578063e1ec3c6814610450578063efdd7c0714610514578063f2fde38b14610534578063f32f6a231461055457600080fd5b80637cdb808d146102f15780637fa084a21461031f5780638456cb591461033f5780638da5cb5b14610354578063a5b8f21014610372578063c5ebeaec146103a257600080fd5b8063415f124011610108578063415f124014610205578063479ad4c314610225578063522b9335146102455780635312ea8e146102915780635c975abb146102b1578063715018a6146102dc57600080fd5b8063150b7a0214610145578063184ff47f1461018e578063379607f5146101b05780633887c27c146101d05780633f4ba83a146101f0575b600080fd5b34801561015157600080fd5b50610170610160366004611f44565b630a85bd0160e11b949350505050565b6040516001600160e01b031990911681526020015b60405180910390f35b34801561019a57600080fd5b506101ae6101a93660046120a7565b610588565b005b3480156101bc57600080fd5b506101ae6101cb36600461208e565b6106b6565b3480156101dc57600080fd5b506101ae6101eb366004612008565b61093d565b3480156101fc57600080fd5b506101ae6109d3565b34801561021157600080fd5b506101ae61022036600461208e565b610a30565b34801561023157600080fd5b506101ae61024036600461208e565b610c4e565b34801561025157600080fd5b506102797f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610185565b34801561029d57600080fd5b506101ae6102ac36600461208e565b610d53565b3480156102bd57600080fd5b50600054600160a01b900460ff165b6040519015158152602001610185565b3480156102e857600080fd5b506101ae610e5b565b3480156102fd57600080fd5b5061031161030c3660046120a7565b610e8f565b604051908152602001610185565b34801561032b57600080fd5b506101ae61033a36600461208e565b610eb7565b34801561034b57600080fd5b506101ae6110d4565b34801561036057600080fd5b506000546001600160a01b0316610279565b34801561037e57600080fd5b506102cc61038d366004611f0a565b60036020526000908152604090205460ff1681565b6101ae6103b036600461208e565b611130565b3480156103c157600080fd5b506101ae6103d03660046120c9565b611567565b3480156103e157600080fd5b506104246103f036600461208e565b600160208190526000918252604090912080549101546001600160a01b03821691600160a01b900465ffffffffffff169083565b604080516001600160a01b03909416845265ffffffffffff909216602084015290820152606001610185565b34801561045c57600080fd5b506104c661046b36600461208e565b6002602081905260009182526040909120805460018201549282015460039092015490926001600160a01b038082169360ff600160a01b9384900416939181169265ffffffffffff908204811692600160d01b909204169087565b604080519788526001600160a01b0396871660208901529415159487019490945293909116606085015265ffffffffffff908116608085015290911660a083015260c082015260e001610185565b34801561052057600080fd5b5061031161052f3660046120a7565b611904565b34801561054057600080fd5b506101ae61054f366004611f0a565b61192c565b34801561056057600080fd5b506102797f000000000000000000000000000000000000000000000000000000000000000081565b600082815260026020819052604090912001546001600160a01b031633146105cb5760405162461bcd60e51b81526004016105c2906121d8565b60405180910390fd5b600082815260026020819052604090912001546106009065ffffffffffff600160d01b8204811691600160a01b9004166122f0565b65ffffffffffff1642106106565760405162461bcd60e51b815260206004820152601b60248201527f5b4865726d65735d3a20546f6f206c61746520746f20746f707570000000000060448201526064016105c2565b600082815260026020526040812060030180548392906106779084906122d8565b909155506106b290506001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163330846119c4565b5050565b600054600160a01b900460ff16156106e05760405162461bcd60e51b81526004016105c2906121ae565b6000818152600260205260409020600101546001600160a01b031633146107195760405162461bcd60e51b81526004016105c290612226565b6000818152600260208190526040909120015461074e9065ffffffffffff600160d01b8204811691600160a01b9004166122f0565b65ffffffffffff1642116107af5760405162461bcd60e51b815260206004820152602260248201527f5b4865726d65735d3a20546865206c6f616e206973206e6f7420636f6d706c65604482015261746560f01b60648201526084016105c2565b600081815260026020526040902060010154600160a01b900460ff1661082b5760405162461bcd60e51b815260206004820152602b60248201527f5b4865726d65735d3a20426f72726f77657220686173206e6f7420726574757260448201526a1b9959081d1a194813919560aa1b60648201526084016105c2565b6000818152600260208190526040822080549101549091600160d01b90910465ffffffffffff169061085d8383611904565b336000908152600360205260409020805460ff19169055905061087f84611a1c565b604051632142170760e11b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906342842e0e906108cf90309033908990600401612129565b600060405180830381600087803b1580156108e957600080fd5b505af11580156108fd573d6000803e3d6000fd5b506109379250506001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690503383611a84565b50505050565b805182511461098e5760405162461bcd60e51b815260206004820152601b60248201527f5b4865726d65735d3a20496e76616c696420617267756d656e7473000000000060448201526064016105c2565b8151602083016020830160026020526020830282015b808310156109cb5782516000908152604090208251905560209283019291909101906109a4565b505050505050565b6000546001600160a01b031633146109fd5760405162461bcd60e51b81526004016105c290612272565b600054600160a01b900460ff16610a265760405162461bcd60e51b81526004016105c290612180565b610a2e611ab4565b565b600054600160a01b900460ff1615610a5a5760405162461bcd60e51b81526004016105c2906121ae565b6000818152600260205260409020600101546001600160a01b03163314610a935760405162461bcd60e51b81526004016105c290612226565b600081815260026020526040902060010154600160a01b900460ff1615610b105760405162461bcd60e51b815260206004820152602b60248201527f5b4865726d65735d3a20596f752063616e6e6f74206c6971756964617465207460448201526a3432903137b93937bbb2b960a91b60648201526084016105c2565b600081815260026020819052604082208054910154610b3e9190600160d01b900465ffffffffffff16610e8f565b6000838152600260208190526040909120600381015491015491925090610b7d9065ffffffffffff600160d01b8204811691600160a01b9004166122f0565b65ffffffffffff16421180610b9157508181115b15610c4957336000908152600360208181526040808420805460ff19908116909155878552600280845282862001546001600160a01b031685529290915290912080549091169055610be283611a1c565b6040518381527fafe8025042fe09457744b5a74c64737289309ac0970116f6efcebcb38b4dc5919060200160405180910390a1610c496001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163383611a84565b505050565b600054600160a01b900460ff1615610c785760405162461bcd60e51b81526004016105c2906121ae565b6000818152600160205260409020546001600160a01b03163314610cae5760405162461bcd60e51b81526004016105c290612226565b336000908152600360205260409020805460ff19169055610cce81611b2a565b604051632142170760e11b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906342842e0e90610d1e90309033908690600401612129565b600060405180830381600087803b158015610d3857600080fd5b505af1158015610d4c573d6000803e3d6000fd5b5050505050565b6000546001600160a01b03163314610d7d5760405162461bcd60e51b81526004016105c290612272565b600054600160a01b900460ff16610da65760405162461bcd60e51b81526004016105c290612180565b6000818152600160209081526040808320546001600160a01b03168084526003909252909120805460ff19169055610ddd82611b2a565b604051632142170760e11b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906342842e0e90610e2d90309085908790600401612129565b600060405180830381600087803b158015610e4757600080fd5b505af11580156109cb573d6000803e3d6000fd5b6000546001600160a01b03163314610e855760405162461bcd60e51b81526004016105c290612272565b610a2e6000611b7c565b6000610e9b8383611904565b610ea690600261233c565b610eb090846122d8565b9392505050565b600081815260026020819052604090912001546001600160a01b03163314610ef15760405162461bcd60e51b81526004016105c2906121d8565b60008181526002602081905260409091200154610f269065ffffffffffff600160d01b8204811691600160a01b9004166122f0565b65ffffffffffff164210610f7c5760405162461bcd60e51b815260206004820152601e60248201527f5b4865726d65735d3a20546f6f206c61746520746f20706179206261636b000060448201526064016105c2565b60008181526002602081905260409091200154610fa890600160a01b900465ffffffffffff164261235b565b6000828152600260208181526040808420928301805465ffffffffffff96909616600160d01b026001600160d01b03909616959095179094556001909101805460ff60a01b1916600160a01b17905533808352600390915290829020805460ff191690559051632142170760e11b81527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316916342842e0e9161105a919030908690600401612129565b600060405180830381600087803b15801561107457600080fd5b505af1158015611088573d6000803e3d6000fd5b5050506000828152600260205260409020546110d191506001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016903390611a84565b50565b6000546001600160a01b031633146110fe5760405162461bcd60e51b81526004016105c290612272565b600054600160a01b900460ff16156111285760405162461bcd60e51b81526004016105c2906121ae565b610a2e611bcc565b600054600160a01b900460ff161561115a5760405162461bcd60e51b81526004016105c2906121ae565b600081815260016020526040902054600160a01b900465ffffffffffff166111c45760405162461bcd60e51b815260206004820152601a60248201527f5b4865726d65735d3a20496e76616c696420746f6b656e20696400000000000060448201526064016105c2565b6000818152600160205260409020546001600160a01b031633141561123c5760405162461bcd60e51b815260206004820152602860248201527f5b4865726d65735d3a20596f752063616e6e6f7420626f72726f7720796f7572604482015267081bdddb8813919560c21b60648201526084016105c2565b6000818152600160208190526040822090810154905461126b9190600160a01b900465ffffffffffff16610e8f565b905060006040518060e00160405280600160008681526020019081526020016000206001015481526020016001600086815260200190815260200160002060000160009054906101000a90046001600160a01b03166001600160a01b03168152602001600015158152602001336001600160a01b031681526020014265ffffffffffff1681526020016001600086815260200190815260200160002060000160149054906101000a900465ffffffffffff1665ffffffffffff16815260200183815250905080600260008581526020019081526020016000206000820151816000015560208201518160010160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555060408201518160010160146101000a81548160ff02191690831515021790555060608201518160020160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555060808201518160020160146101000a81548165ffffffffffff021916908365ffffffffffff16021790555060a082015181600201601a6101000a81548165ffffffffffff021916908365ffffffffffff16021790555060c08201518160030155905050600160036000336001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a81548160ff02191690831515021790555061147283611b2a565b60408051338152602081018590527fcbc04eca7e9da35cb1393a6135a199ca52e450d5e9251cbd99f7847d33a36750910160405180910390a16114e06001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163330856119c4565b604051632142170760e11b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906342842e0e9061153090309033908890600401612129565b600060405180830381600087803b15801561154a57600080fd5b505af115801561155e573d6000803e3d6000fd5b50505050505050565b600054600160a01b900460ff16156115915760405162461bcd60e51b81526004016105c2906121ae565b600082116115e15760405162461bcd60e51b815260206004820152601760248201527f5b4865726d65735d3a20496e76616c696420707269636500000000000000000060448201526064016105c2565b60008165ffffffffffff16116116395760405162461bcd60e51b815260206004820152601a60248201527f5b4865726d65735d3a20496e76616c6964206475726174696f6e00000000000060448201526064016105c2565b6040516331a9108f60e11b8152600481018490527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690636352211e9060240160206040518083038186803b15801561169957600080fd5b505afa1580156116ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116d19190611f27565b6001600160a01b0316336001600160a01b0316146117445760405162461bcd60e51b815260206004820152602a60248201527f5b4865726d65735d3a20596f7520617265206e6f7420746865206f776e6572206044820152691bd9881d1a194813919560b21b60648201526084016105c2565b3360009081526003602052604090205460ff16156117b65760405162461bcd60e51b815260206004820152602960248201527f5b4865726d65735d3a2043616e206f6e6c79206c697374206f6e65204e465420604482015268617420612074696d6560b81b60648201526084016105c2565b336000818152600360209081526040808320805460ff1916600190811790915581516060808201845286825265ffffffffffff8881168387018181528487018c81528d8a5286895298879020855181549251909416600160a01b026001600160d01b03199092166001600160a01b039094169390931717825596519301929092558251958652928501889052908401869052830191909152907f6ab0c0d6f398b4ef2ef303a1d9e3270349ccda6566f59107a0f2c3af79ef07349060800160405180910390a1604051632142170760e11b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906342842e0e906118cc90339030908990600401612129565b600060405180830381600087803b1580156118e657600080fd5b505af11580156118fa573d6000803e3d6000fd5b5050505050505050565b6000640178f7e8008261191885601e61233c565b611922919061233c565b610eb0919061231a565b6000546001600160a01b031633146119565760405162461bcd60e51b81526004016105c290612272565b6001600160a01b0381166119bb5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016105c2565b6110d181611b7c565b610937846323b872dd60e01b8585856040516024016119e593929190612129565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152611c31565b60008181526002602081815260408084208481556001810180546001600160a81b0319169055928301849055600390920192909255518281527f522b8452233fe9e17e001a30b0cfb02eb26ababc46979f652e52eba6d2b3b46391015b60405180910390a150565b6040516001600160a01b038316602482015260448101829052610c4990849063a9059cbb60e01b906064016119e5565b600054600160a01b900460ff16611add5760405162461bcd60e51b81526004016105c290612180565b6000805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600081815260016020818152604080842080546001600160d01b031916815590920192909255518281527fca84ca6d01d752679a9eddecd56bc517d62370bc1f6a51bfb09d2221a709258f9101611a79565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600054600160a01b900460ff1615611bf65760405162461bcd60e51b81526004016105c2906121ae565b6000805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611b0d3390565b6000611c86826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316611d039092919063ffffffff16565b805190915015610c495780806020019051810190611ca4919061206c565b610c495760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016105c2565b6060611d128484600085611d1a565b949350505050565b606082471015611d7b5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b60648201526084016105c2565b6001600160a01b0385163b611dd25760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016105c2565b600080866001600160a01b03168587604051611dee919061210d565b60006040518083038185875af1925050503d8060008114611e2b576040519150601f19603f3d011682016040523d82523d6000602084013e611e30565b606091505b5091509150611e40828286611e4b565b979650505050505050565b60608315611e5a575081610eb0565b825115611e6a5782518084602001fd5b8160405162461bcd60e51b81526004016105c2919061214d565b600082601f830112611e9557600080fd5b8135602067ffffffffffffffff821115611eb157611eb16123c4565b8160051b611ec08282016122a7565b838152828101908684018388018501891015611edb57600080fd5b600093505b85841015611efe578035835260019390930192918401918401611ee0565b50979650505050505050565b600060208284031215611f1c57600080fd5b8135610eb0816123da565b600060208284031215611f3957600080fd5b8151610eb0816123da565b60008060008060808587031215611f5a57600080fd5b8435611f65816123da565b9350602085810135611f76816123da565b935060408601359250606086013567ffffffffffffffff80821115611f9a57600080fd5b818801915088601f830112611fae57600080fd5b813581811115611fc057611fc06123c4565b611fd2601f8201601f191685016122a7565b91508082528984828501011115611fe857600080fd5b808484018584013760008482840101525080935050505092959194509250565b6000806040838503121561201b57600080fd5b823567ffffffffffffffff8082111561203357600080fd5b61203f86838701611e84565b9350602085013591508082111561205557600080fd5b5061206285828601611e84565b9150509250929050565b60006020828403121561207e57600080fd5b81518015158114610eb057600080fd5b6000602082840312156120a057600080fd5b5035919050565b600080604083850312156120ba57600080fd5b50508035926020909101359150565b6000806000606084860312156120de57600080fd5b8335925060208401359150604084013565ffffffffffff8116811461210257600080fd5b809150509250925092565b6000825161211f818460208701612382565b9190910192915050565b6001600160a01b039384168152919092166020820152604081019190915260600190565b602081526000825180602084015261216c816040850160208701612382565b601f01601f19169190910160400192915050565b60208082526014908201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604082015260600190565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b6020808252602e908201527f5b4865726d65735d3a20596f7520617265206e6f742074686520626f72726f7760408201526d195c881bd9881d1a1a5cc813919560921b606082015260800190565b6020808252602c908201527f5b4865726d65735d3a20596f7520617265206e6f7420746865206c656e64657260408201526b081bd9881d1a1a5cc813919560a21b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b604051601f8201601f1916810167ffffffffffffffff811182821017156122d0576122d06123c4565b604052919050565b600082198211156122eb576122eb6123ae565b500190565b600065ffffffffffff808316818516808303821115612311576123116123ae565b01949350505050565b60008261233757634e487b7160e01b600052601260045260246000fd5b500490565b6000816000190483118215151615612356576123566123ae565b500290565b600065ffffffffffff8381169083168181101561237a5761237a6123ae565b039392505050565b60005b8381101561239d578181015183820152602001612385565b838111156109375750506000910152565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146110d157600080fdfea26469706673582212209f4eb3a3b818dec4ef5ce14fd4ecb41d1b6a3fa941570c9949ca7e3a16a6e0a664736f6c63430008070033";

type HermesConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HermesConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Hermes__factory extends ContractFactory {
  constructor(...args: HermesConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _drachma: PromiseOrValue<string>,
    _olympus: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Hermes> {
    return super.deploy(_drachma, _olympus, overrides || {}) as Promise<Hermes>;
  }
  override getDeployTransaction(
    _drachma: PromiseOrValue<string>,
    _olympus: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_drachma, _olympus, overrides || {});
  }
  override attach(address: string): Hermes {
    return super.attach(address) as Hermes;
  }
  override connect(signer: Signer): Hermes__factory {
    return super.connect(signer) as Hermes__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HermesInterface {
    return new utils.Interface(_abi) as HermesInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Hermes {
    return new Contract(address, _abi, signerOrProvider) as Hermes;
  }
}