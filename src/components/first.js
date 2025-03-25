import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/Home.module.css';
import video from "../video/video.mp4";

function First() {
  return (
    <div className={styles.videoContainer}>
      <video autoPlay loop muted className={styles.videoBackground}>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.master}>
        <p>Marksheet Verification System</p>
        <nav className={styles.navbar}>
          <center className={styles.centerStyle}>
            <div className={styles.logVerifyContainer}>
              <Link to="/Login" className={styles.navLink}>
                Login
              </Link>
              <Link to="/verify" className={styles.navLink}>
                Verify
              </Link>
            </div>
          </center>
        </nav>
      </div>
    </div>
  );
}

export default First;
