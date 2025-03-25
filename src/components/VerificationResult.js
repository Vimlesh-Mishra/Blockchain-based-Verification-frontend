import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../CSS/Vresult.module.css';
import video from "../video/video.mp4";

const VerificationResult = () => {
    const location = useLocation();
    const result = location.state.result; // result is already a boolean
    const studentName = location.state.studentName;
    const prn = location.state.prn; // Get student name from location state

    return (
        <div className={styles.videoContainer}>
        <video autoPlay loop muted className={styles.videoBackground}>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.master}>
            <h2 className={styles.test}>Verification Result</h2>
            {result ? (
                <p>The document is valid and verified for student: <strong>{studentName}</strong> <br></br> PRN is : {prn}.</p>
            ) : (
                <p>The document could not be verified.</p>
            )}
        </div>
        </div>
    );
};

export default VerificationResult;
