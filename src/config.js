export const debug = process.env.NODE_ENV !== 'production';
export const root = debug ? 'http://ciddev.tabularasa.host' : '';
export const wsRoot = 'ws://ciddev.tabularasa.host/api/user/';

export const projectName = 'cid';

export const abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_startDate",
          "type": "uint32"
        },
        {
          "name": "_finishDate",
          "type": "uint32"
        },
        {
          "name": "_currentSupply",
          "type": "uint256"
        },
        {
          "name": "_precision",
          "type": "uint256"
        },
        {
          "name": "_token",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "amount",
          "type": "int256"
        },
        {
          "indexed": false,
          "name": "user",
          "type": "address"
        }
      ],
      "name": "EthToBalance",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "totalEthAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "totalCIDAmount",
          "type": "uint256"
        }
      ],
      "name": "DistributeAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "amountCID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "user",
          "type": "address"
        }
      ],
      "name": "DistributeToken",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_startDate",
          "type": "uint32"
        },
        {
          "name": "_finishDate",
          "type": "uint32"
        },
        {
          "name": "_currentSupply",
          "type": "uint256"
        },
        {
          "name": "_precision",
          "type": "uint256"
        }
      ],
      "name": "startNewPeriod",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "becomeInvestor",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getInvestorBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_precision",
          "type": "uint8"
        }
      ],
      "name": "updatePrecision",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getPrecision",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "distributeTokens",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "numerator",
          "type": "uint256"
        },
        {
          "name": "denominator",
          "type": "uint256"
        }
      ],
      "name": "percent",
      "outputs": [
        {
          "name": "quotient",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "mintToken",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "normalizeValue",
      "outputs": [
        {
          "name": "normValue",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "currentTime",
      "outputs": [
        {
          "name": "_currentTime",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]