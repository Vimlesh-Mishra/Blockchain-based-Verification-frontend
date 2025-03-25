import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers, keccak256 } from 'ethers';
import { contractABI } from '../blockchain';
import styles from '../CSS/Verification.module.css';
import video from "../video/video.mp4";
import axios from 'axios';

const contractAddress = "0x60C4d4b1912cc6511a00426DaA5340e915E6567A"; // Update with your latest contract address
const pinataUrl = "https://api.pinata.cloud/data/pinList?hashContains=";

const VerificationForm = () => {
    const [file, setFile] = useState(null);
    const [verificationResult, setVerificationResult] = useState(null);
    const [studentName, setStudentName] = useState('');
    const [prn, setPrn] = useState(''); // New state for PRN
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert("Please upload a document.");
            return;
        }

        setLoading(true);

        const reader = new FileReader();
        reader.onload = async function (e) {
            try {
                const fileBuffer = e.target.result;
                const uint8Array = new Uint8Array(fileBuffer);
                const hash = keccak256(uint8Array);
                console.log('Hash for verification:', hash);

                // Connect to Ethereum network
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

                console.log("Sending verification transaction...");

                // Call verifyMarksheet() as a transaction (verifier pays gas fee)
                const tx = await contract.verifyMarksheet(hash);
                await tx.wait(); // Wait for transaction confirmation

                console.log("Verification transaction successful:", tx.hash);

                // Fetch the marksheet details (student name, PRN & IPFS hash)
                const [fetchedStudentName, prn, ipfsHash] = await contract.getMarksheetDetails(hash);
                console.log("Fetched Student Name:", fetchedStudentName);
                console.log("PRN:", prn);
                console.log("IPFS Hash:", ipfsHash);

                setVerificationResult(true);
                setStudentName(fetchedStudentName);
                setPrn(prn); // Store PRN

                // Check if the document exists in IPFS
                const response = await axios.get(`${pinataUrl}${ipfsHash}`, {
                    headers: {
                        'pinata_api_key': 'ca6f527e731b295e1288',
                        'pinata_secret_api_key': '1cea24fd0a03b66cb2fb173abc774d69bc53b679ce064b816d6aa7dc6138218e',
                    }
                });

                if (response.status === 200) {
                    console.log("File found on Pinata IPFS.");
                } else {
                    console.log("File not found on Pinata IPFS.");
                }

                navigate('/result', { state: { result: true, studentName: fetchedStudentName, prn: prn } });

            } catch (err) {
                console.error('Verification failed:', err);
                setVerificationResult(false);
            } finally {
                setLoading(false);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div className={styles.videoContainer}>
            <video autoPlay loop muted className={styles.videoBackground}>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className={styles.master}>
                <div className={styles.verifyContainer}>
                    <h2 className={styles.test}>Verify Document</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            accept=".pdf"
                            className={styles.fileInput}
                            onChange={handleFileChange}
                            required
                        /><br /><br />
                        <button type="submit">Verify</button>
                    </form>
                    {loading && <p>Verifying document...</p>}
                    {verificationResult !== null && (
                        <div>
                            <p>Verification Result: {verificationResult ? 'Valid' : 'Invalid'}</p>
                            {verificationResult && studentName && prn && (
                                <>
                                    <p>Student Name: {studentName}</p>
                                    <p>PRN: {prn}</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerificationForm;
