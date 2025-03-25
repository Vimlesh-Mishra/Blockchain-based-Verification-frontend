import { ethers } from 'ethers';

// Paste your deployed contract ABI here
export const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalUploaded",
        "type": "uint256"
      }
    ],
    "name": "BatchUploadCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "marksheetHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "studentName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "prn",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "name": "MarksheetUploaded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "verifier",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "marksheetHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "VerificationAttempt",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_providedHash",
        "type": "bytes32"
      }
    ],
    "name": "getMarksheetDetails",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "marksheets",
    "outputs": [
      {
        "internalType": "string",
        "name": "studentName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "prn",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "marksheetHash",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_studentName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_prn",
        "type": "string"
      },
      {
        "internalType": "bytes32",
        "name": "_marksheetHash",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_ipfsHash",
        "type": "string"
      }
    ],
    "name": "uploadMarksheet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "_studentNames",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "_prns",
        "type": "string[]"
      },
      {
        "internalType": "bytes32[]",
        "name": "_marksheetHashes",
        "type": "bytes32[]"
      },
      {
        "internalType": "string[]",
        "name": "_ipfsHashes",
        "type": "string[]"
      }
    ],
    "name": "uploadMultipleMarkSheets",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_providedHash",
        "type": "bytes32"
      }
    ],
    "name": "verifyMarksheet",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Address of the deployed contract
const contractAddress = "0x60C4d4b1912cc6511a00426DaA5340e915E6567A"; // Replace with your deployed contract address

let contract;

// Initialize the contract
export const initializeContract = async () => {
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum); // Updated to BrowserProvider
    const signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    alert('Please install MetaMask');
  }
};

// Function to upload marksheet
export const uploadMarksheet = async (studentName, studentRollNumber, marksheetHash) => {
  try {
    const transaction = await contract.uploadMarksheet(studentName, studentRollNumber, marksheetHash);
    await transaction.wait();
    return true;
  } catch (error) {
    console.error('Error uploading marksheet:', error);
    alert('Error uploading marksheet. Please try again.');
    return false;
  }
};

// Function to verify marksheet
export const verifyMarksheet = async (providedHash) => {
  try {
    const isValid = await contract.verifyMarksheet(providedHash); // Use only the hash for verification
    return isValid;
  } catch (error) {
    console.error('Error verifying marksheet:', error);
    alert('Error verifying marksheet. Please try again.');
    return false;
  }
};
