**Blockchain-Based Document Verification**

A Secure and Tamper-Proof Solution for Academic Records

This project presents a blockchain-powered system that automates marksheet verification, enhances security, and reduces costs. It leverages Ethereum smart contracts, decentralized storage via IPFS, and modern web technologies to provide a scalable, efficient, and fraud-resistant solution for academic record validation.

🚀 Overview

This project presents a blockchain-based marksheet verification system that addresses the challenges of fake academic credentials and document tampering. By integrating Ethereum smart contracts with decentralized storage (IPFS via Pinata), the system offers:

Immutable Storage: Once a document’s hash is recorded on the blockchain, it cannot be altered.

Decentralized Document Management: Marksheets are stored off-chain on IPFS for enhanced security and accessibility.

Cost Optimization: Batch uploading and verifier-paid transactions help reduce gas fees.

Scalability: The research explores NFT-based academic credentials for future enhancements.

The system aims to automate and secure academic record verification for universities, employers, and credential verification bodies worldwide.

❓ Problem Definition

Traditional marksheet verification methods are:

Dependent on centralized databases vulnerable to hacking and unauthorized modifications.

Costly and time-consuming due to manual verification processes.

Limited in scalability as they handle individual document uploads, leading to high gas fees.

Inadequate in providing automated and tamper-proof validation.

🎯 Objectives

This research aims to develop a cost-effective, scalable, and fraud-resistant marksheet verification system that:

🔄 Automates marksheet verification using blockchain and IPFS.

💰 Optimizes gas fees through batch processing and verifier-paid transactions.

🔐 Ensures security and transparency with immutable smart contracts.

🎓 Explores NFT-based academic credentials for future scalability.

By addressing these challenges, the solution provides a practical and adoptable framework for secure academic record validation.

📝 Methodology

A) Uploader Flow (University/Authorized Admin)

Authentication: Admins log in using MetaMask to verify their identity.

Document Upload:

Enter student details (name, PRN).

Upload the marksheet (PDF).

Validate the document before proceeding.

Transaction & Storage:

Confirm the transaction by paying gas fees.

Compute the Keccak-256 hash of the document.

Upload the file to IPFS (via Pinata) to obtain a unique CID.

Record the document hash, IPFS CID, and student details on the Ethereum blockchain via a smart contract.

B) Verifier Flow (Foreign University/Employer)

Authentication: Verifiers log in via MetaMask.

Verification Process:

Upload the marksheet.

The system computes the document hash (Keccak-256).

Compare the computed hash with the one stored on the blockchain.

Display student details if the hash matches, otherwise indicate a verification failure.

⚙️ Implementation

Software Stack

Frontend: React.js

Backend: Node.js & Express.js, MongoDB (for RBAC)

Blockchain Components:

Ethereum Blockchain

Solidity (Smart Contracts)

Ethers.js (Web3 Integration)

Hardhat (Development & Testing)

Ganache (Local Blockchain for Testing)

MetaMask (Wallet & Transactions)

Key Features

Smart Contract Deployment & Interaction

File Upload & Hash Storage (Keccak-256 & IPFS)

Role-Based Access Control (RBAC)

Gas Fee Optimization & Batch Upload

Verifier-Paid Gas Fees

🗺 System Architecture & Data Flow

Web Application (Frontend): User-friendly UI for uploading and verifying documents.

IPFS (via Pinata): Decentralized storage for marksheets.

Ethereum Blockchain: Immutable storage of document hashes and metadata.

Verification Process: Hash-based comparison to authenticate documents.

📊 Results

Accurate Verification: Matches computed document hashes with blockchain records.

Efficient Storage: Reduces gas fees by storing only essential data on-chain.

Improved Security: Prevents tampering with academic records.

🔮 Future Scope

Decentralized IPFS Storage: Transition to fully decentralized nodes or integrate Filecoin.

NFT-Based Credentials: Mint academic certificates as NFTs with on-chain metadata.

Enhanced Role-Based Access: Implement smart contract-based RBAC.

Layer 2 Solutions: Utilize Polygon PoS for reduced gas fees and increased scalability.

📸 Screenshots & Demo

🔗 Live Demo

🌐 Click here to access the live project

🎥 Demo Video



🔚 Conclusion

This project provides an efficient, secure, and decentralized solution for academic document verification. By leveraging blockchain and IPFS, it eliminates fraud, reduces verification time, and enhances security. Future enhancements, such as NFT credentials and Layer 2 solutions, will further improve scalability and adoption.

📚 References

Ethereum Documentation: ethereum.org

IPFS & Pinata: ipfs.io | pinata.cloud

Solidity Documentation: soliditylang.org

⚙️ Setup & Execution

**Prerequisites**

-Node.js & npm installed

-MetaMask browser extension

-Hardhat & Ganache installed

-Ethereum testnet account with test ETH

**Installation & Running**

-Clone the Repository:

git clone <repository_url>
cd <project_directory>

-Install Dependencies:

npm install

-Deploy Smart Contracts:

npx hardhat run scripts/deploy.js --network holesky

-Run the Application:

npm start

-Connect MetaMask to the correct network

Now you’re ready to interact with the blockchain-based marksheet verification system! 🚀
