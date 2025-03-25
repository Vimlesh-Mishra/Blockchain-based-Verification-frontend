import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../CSS/login.module.css';
import { setSession, getSession } from '../SessionManager';
import video from "../video/video.mp4";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [formError, setFormError] = useState(''); // State for form error message
  const SERVER_URL = 'https://backend-lake-delta-27.vercel.app/';

  // Redirect if already logged in
  useEffect(() => {
    const session = getSession();
    if (session) {
      navigate('/upload'); // Redirect to upload page if session exists
    }
  }, [navigate]);

  const handleLogin = async () => {
    // Ensure all required fields are filled
    if (!username || !password) {
      setFormError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/myapp/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setLoginStatus('Login successful');

        // Set the session for logged-in user
        setSession({ username: data.username });

        // Redirect to the upload page
        navigate('/upload');
      } else {
        setLoginStatus('Login failed. Please check your username and password.');
      }
    } catch (error) {
      setLoginStatus('Error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.videoContainer}>
      <video autoPlay loop muted className={styles.videoBackground}>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.App}>
        <div className={styles.mass}>
          <h1 className={styles.test}>Login Page</h1>
          <div className={styles.master}>
            <i className={`fa fa-user ${styles['fa-user']}`}></i>
            <input
              type="text"
              className={styles.inputcontainer}
              placeholder="Username*"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.master}>
            <i className={`fa fa-user ${styles['fa-user']}`}></i>
            <input
              type="password"
              placeholder="Password*"
              className={styles.inputcontainer}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <br />
          {formError && <div className={styles.errormessage}>{formError}</div>}
          <div className={styles.buttoncontainer}>
            <button className={styles.button} onClick={handleLogin}>Login</button>
          </div>
        </div>
        {loginStatus && <div className={styles.loginstatus}>{loginStatus}</div>}
      </div>
    </div>
  );
}

export default Login;
