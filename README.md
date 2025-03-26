# 📄 Blockchain-Based Document Verification  

### A Secure and Tamper-Proof Solution for Academic Records  

This project presents a blockchain-powered system that automates marksheet verification, enhances security, and reduces costs. It leverages Ethereum smart contracts, decentralized storage via IPFS, and modern web technologies to provide a scalable, efficient, and fraud-resistant solution for academic record validation.  
### Demo Video - 🔗 **[Watch the Demo Video](https://drive.google.com/file/d/1B4xQj1o3EvBwbLE-D-2v6OahcIukBIPP/view?usp=sharing)**  

## 📑 Table of Contents  

- [🚀 Overview](#-overview)  
- [❓ Problem Definition](#-problem-definition)  
- [🎯 Objectives](#-objectives)  
- [📝 Methodology](#-methodology)  
- [⚙️ Implementation](#-implementation)  
- [🗺 System Architecture & Data Flow](#-system-architecture--data-flow)  
- [📊 Results](#-results)  
- [🔮 Future Scope](#-future-scope)  
- [📸 Screenshots & Demo](#-screenshots--demo)  
- [⚙️ How to interact with live demo](#-how-to-interact-with-live-demo)  

---

## 🚀 Overview  

This project is a **blockchain-based marksheet verification system** that prevents **fake academic credentials** and document tampering. It integrates **Ethereum smart contracts** with **decentralized storage (IPFS via Pinata)**, offering:  

- 🔒 **Immutable Storage:** Once a document’s hash is recorded on the blockchain, it cannot be altered.  
- 🌍 **Decentralized Document Management:** Marksheets are stored on **IPFS** for security and accessibility.  
- 💰 **Cost Optimization:** Batch uploads and **verifier-paid transactions** help reduce gas fees.  
- 📈 **Scalability:** Future enhancements include **NFT-based academic credentials**.  

The system is designed for **universities, employers, and verification authorities** worldwide.  

---

## ❓ Problem Definition  

Traditional marksheet verification methods:  
❌ Depend on centralized databases vulnerable to hacking.  
❌ Are time-consuming and costly due to manual verification.  
❌ Lack scalability, leading to high **Verification cost**. 

❌ Cannot provide **automated and tamper-proof validation**.  

This project **addresses** these limitations by implementing **blockchain and IPFS-based verification**.  

---

## 🎯 Objectives  

This system aims to provide a **cost-effective, scalable, and fraud-resistant solution** for academic document verification.  

### 🔹 Key Goals:  
1. ✅ **Automate marksheet verification** using blockchain and IPFS.  
2. ✅ **Optimize document verification cost and time**.  
3. ✅ **Ensure security & transparency** via immutable smart contracts.  
4. ✅ **Explore NFT-based academic credentials** for future scalability.  

---

## 📝 Methodology  

### 🔹 A) Uploader Flow (University/Admin)  
1️⃣ **Authentication:** Admins log in via **MetaMask**.  
2️⃣ **Upload Process:**  
   - Enter student details (name, PRN).  
   - Upload marksheet (PDF).  
   - Validate before proceeding.
     
3️⃣ **Transaction & Storage:**  
   - Confirm transaction & pay gas fees.  
   - Compute **Keccak-256 hash** of the document.  
   - Store on **IPFS (via Pinata)** to get a **CID**.  
   - Record hash & IPFS CID on **Ethereum blockchain**.  

### 🔹 B) Verifier Flow (Foreign University/Employer)  
1️⃣ **Authentication:** Verifiers log in via **MetaMask**.  
2️⃣ **Verification Process:**  
   - Upload the marksheet.  
   - System computes the **Keccak-256 hash**.  
   - Compares it with the blockchain hash.  
   - **If matched**, display student details; otherwise, verification fails.  

---

## ⚙️ Implementation  

### 🔹 Software Stack  

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js, MongoDB (RBAC)  
- **Blockchain Components:**  
  - Ethereum Smart Contracts (Solidity)  
  - Ethers.js (Web3 Integration)  
  - Hardhat (Deployment & Testing)  
  - Ganache (Local Blockchain for Testing)
  - Holesky (Ethereum's public testnet)
  - MetaMask (Wallet & Transactions)  

### 🔹 Key Features  

✅ **Smart Contract Deployment & Interaction**  
✅ **File Upload & Hash Storage (Keccak-256 & IPFS)**  
✅ **Role-Based Access Control (RBAC)**  
✅ **Gas Fee Optimization & Batch Upload**  
✅ **Verifier-Paid Gas Fees**  

---

## 🗺 System Architecture & Data Flow  

📌 **Frontend (React.js):** Provides a user-friendly UI.  
📌 **IPFS (via Pinata):** Decentralized storage for marksheets.  
📌 **Ethereum Blockchain:** Stores document hashes for verification.  
📌 **Verification Process:** Ensures tamper-proof authentication via hashing.  

---

## 🔮 Future Scope  

🔹 **Decentralized IPFS Storage:** Transition to fully decentralized IPFS nodes.  
🔹 **NFT-Based Credentials:** Convert academic certificates into **NFTs** with metadata.  
🔹 **Enhanced RBAC:** Smart contract-based role management.  
🔹 **Layer 2 Solutions:** Use **Polygon PoS** for lower gas fees & scalability.  

---

## 📸 Screenshots & Demo  
1.Uploading document
![upload](https://github.com/user-attachments/assets/832a731d-6177-4d3f-84e0-106b4c4d7bac)

2.Uploading successful

![upload_Success](https://github.com/user-attachments/assets/c058ff61-863c-4cb3-b530-7cd51b2bef5c)

3.Verifying document
![verifying](https://github.com/user-attachments/assets/d739aa6e-b7e4-431a-8f68-dfe4965db54c)

4.Verification Result
![verification result](https://github.com/user-attachments/assets/0aeed399-f488-430e-b3f6-da436135e509)
 
### 🎥 Live Demo  
🔗 **[Try the Live Demo](https://blockchain-based-verification-frontend.vercel.app/)**  

---

## ⚙️ How to interact with live demo?

Before interacting with the live demo please ensure the following... 

### 🔹 1) Create a metamask wallet 
Simply watch any YT video and do as directed. Add it as an extension in your browser.
### 🔹 2) Add Holesky Testnet to MetaMask 
Open MetaMask and click on the network dropdown (top left corner) enable testnets(checkbox) search and add Holesky.
### 🔹 3) Get Test ETH from Google Faucet
Search for holesky faucets and click on the first link. Enter your MetaMask Wallet Address and request test ETH. Now you are read to use the demo.
### 🔹 4) To upload a document you need to login
Login as "Admin" (username) and enter password "112233". Now upload the desired document Click on Add Student and enter details(note that PRN is any 16 digit number often it is the seat number). As the smart contract is deployed on testnet uploading might take upto 30-40 seconds.
### 🔹 5) Verify the same uploaded document.
After done with uploading , logout , and click on verify. Verifiy the uploaded document and also make desired changes in this document and verify it again , it shouldn't be verified by the system.



  
