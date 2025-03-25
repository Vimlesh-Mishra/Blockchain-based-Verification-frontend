import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { keccak256, hexlify, getBytes, BrowserProvider, Contract } from 'ethers';
import { getSession, clearSession } from '../SessionManager';
import { contractABI } from '../blockchain';
import HandleLogout from './LogoutButton';
import styles from '../CSS/Upload.module.css';
import axios from 'axios';
import video from "../video/video.mp4";

const contractAddress = "0x60C4d4b1912cc6511a00426DaA5340e915E6567A";

const pinataApiUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const pinataApiKey = 'ca6f527e731b295e1288';
const pinataApiSecret = '1cea24fd0a03b66cb2fb173abc774d69bc53b679ce064b816d6aa7dc6138218e';

function UploadDocument() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const session = getSession();
        if (!session) {
            clearSession();
            navigate('/login');
        }
    }, [navigate]);

    const handleFileChange = (event, index) => {
        const files = [...students];
        files[index].marksheet = event.target.files[0];
        setStudents(files);
    };

    const handleAddStudent = () => {
        setStudents([...students, { studentName: '', prn: '', marksheet: null }]);
    };

    const handleChange = (index, field, value) => {
        const updatedStudents = [...students];
        updatedStudents[index][field] = value;
        setStudents(updatedStudents);
    };
    const handleUpload = async () => {
        setIsUploading(true);  // Show "Uploading document..."
        try {
            await UploadDocument();  // Your upload logic here
            setUploadStatus({ success: true, message: "Document uploaded successfully" });
        } catch (error) {
            setUploadStatus({ success: false, message: "Upload failed. Please try again." });
        }
        setIsUploading(false);  // Hide "Uploading document..."
    };

    const handleBatchUpload = async (event) => {
        event.preventDefault();
        if (students.length === 0) {
            alert("Please add at least one student.");
            return;
        }

        setIsUploading(true);  // Show "Uploading document..." message

        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new Contract(contractAddress, contractABI, signer);

            let studentNames = [];
            let prns = [];
            let marksheetHashes = [];
            let ipfsHashes = [];

            for (const student of students) {
                if (!student.marksheet) {
                    alert(`No file selected for ${student.studentName}`);
                    return;
                }

                const formData = new FormData();
                formData.append('file', student.marksheet);
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        pinata_api_key: pinataApiKey,
                        pinata_secret_api_key: pinataApiSecret
                    }
                };

                const ipfsResponse = await axios.post(pinataApiUrl, formData, config);
                const ipfsHash = ipfsResponse.data.IpfsHash;

                const reader = new FileReader();
                reader.readAsArrayBuffer(student.marksheet);
                const arrayBuffer = await new Promise(resolve => {
                    reader.onload = () => resolve(reader.result);
                });

                const uint8Array = new Uint8Array(arrayBuffer);
                const hashBytes32 = getBytes(keccak256(uint8Array));

                studentNames.push(student.studentName);
                prns.push(student.prn);
                marksheetHashes.push(hashBytes32);
                ipfsHashes.push(ipfsHash);
            }

            console.log("Uploading batch to blockchain...");
            const tx = await contract.uploadMultipleMarkSheets(studentNames, prns, marksheetHashes, ipfsHashes);
            await tx.wait();

            console.log("Batch upload successful:", tx.hash);
            setUploadStatus({ success: true, message: "Batch upload successful!" });
        } catch (err) {
            console.error('Batch upload failed:', err);
            setUploadStatus({ success: false, message: 'Batch upload failed. Please try again.' });
        }

        setIsUploading(false);  // Hide "Uploading document..." message
    };


    return (
        <div className={styles.videoContainer}>
            <video autoPlay loop muted className={styles.videoBackground}>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className={styles.master}>
                <HandleLogout />
                <div className={styles.outerContainer}>
                    <div className={styles.formContainer}>
                        <h1 className={styles.test}>Batch Upload Documents</h1>
                        <form onSubmit={handleBatchUpload}>
                            {students.map((student, index) => (
                                <div key={index}>
                                    <br></br>
                                    <input type="text" className={styles.inp_text} placeholder="Student Name" value={student.studentName} onChange={(e) => handleChange(index, 'studentName', e.target.value)} required />
                                    <br></br>
                                    <br></br>
                                    <input type="number" className={styles.inp_text} placeholder="PRN NUMBER" value={student.prn} onChange={(e) => handleChange(index, 'prn', e.target.value)} required />
                                    <br></br>
                                    <input type="file" className={styles.inp_choose} accept=".pdf" onChange={(e) => handleFileChange(e, index)} required />
                                    <hr></hr>
                                </div>
                            ))}
                            <button type="button" onClick={handleAddStudent}>+ Add Student</button>
                            <button type="submit">Batch Upload</button>
                        </form>
                        {isUploading ? (
                            <p>Uploading document...</p>
                        ) : (
                            uploadStatus && (
                                <div className={uploadStatus.success ? styles.successMessage : styles.errorMessage}>
                                    <p>{uploadStatus.message}</p>
                                </div>
                            )
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadDocument;
