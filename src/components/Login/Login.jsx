import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function callLogin(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const { status } = await axios.post(`https://api-dev.rescounts.com/api/v1/users/login`, reqBody); 
      if (status === 201) {
        navigate('/');
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.response.data.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Email not valid").required("Email is required"),
    password: Yup.string().required("Password is required"),
    notification: Yup.string(),
  });

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      notification: "",
    },
    validationSchema,
    onSubmit: callLogin,
  });

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h2 className={styles.loginTitle}>Login</h2>
        <div className={styles.socialIcons}>
          <FontAwesomeIcon icon={faGoogle} className={styles.icon} />
          <FontAwesomeIcon icon={faApple} className={styles.icon} />
          <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
        </div>
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
        <form onSubmit={loginForm.handleSubmit} className={styles.loginForm}>
          <h6>Email</h6>
          <div className={styles.inputRow}>
            <input
              type="email"
              name="email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              className={styles.input}
              placeholder="Email"
            />
            {loginForm.errors.email && loginForm.touched.email && (
              <div className={styles.error}>{loginForm.errors.email}</div>
            )}
          </div>
          <h6>Password</h6>
          <div className={styles.inputRow}>
            <input
              type="password"
              name="password"
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              className={styles.input}
              placeholder="Password"
            />
            {loginForm.errors.password && loginForm.touched.password && (
              <div className={styles.error}>{loginForm.errors.password}</div>
            )}
          </div>
          <h6>Notification</h6>
          <div className={styles.inputRow}>
            <input
              type="text"
              name="notification"
              value={loginForm.values.notification}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              className={styles.input}
              placeholder="Notification"
            />
            {loginForm.errors.notification && loginForm.touched.notification && (
              <div className={styles.error}>{loginForm.errors.notification}</div>
            )}
          </div>
          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? <span className={styles.spinner}></span> : "Login"}
          </button>
        </form>
        <div className={styles.createAccountText}>
          Create new account? <a className={styles.linkk} href="/Register">Sign Up</a>
        </div>
      </div>
    </div>
  );
}
