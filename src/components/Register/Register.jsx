import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faApple,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().email("Email not valid").required("Email is required"),
  firstName: Yup.string()
    .min(3, "First name is too short")
    .max(20, "First name is too long")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Last name is too short")
    .max(20, "Last name is too long")
    .required("Last name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  phoneNumber: Yup.string()
    .matches(/^01[0125][0-9]{8}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  allowsPromotions: Yup.boolean(),
  allowsSMS: Yup.boolean(),
});

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // async function callRegister(reqBody) {
  //   setIsLoading(true);
  //   try {
  //     let { status } = await axios.post(`https://api-dev.rescounts.com/api/v1/users`, reqBody);
  //     console.log(status);
  //     if (status === 201) {
  //       window.location.href = "/Login";
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     alert(error.response.data.message); // Display the error message in an alert
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  async function callRegister(reqBody) {
    setIsLoading(true);
    try {
      let { status } = await axios.post(
        `https://api-dev.rescounts.com/api/v1/users`,
        reqBody
      );
      console.log(status);
      if (status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setIsLoading(false);
      let errorMessage = "An error occurred.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const registerForm = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      allowsPromotions: true,
      allowsSMS: true,
      notification: "",
    },
    validationSchema,
    onSubmit: callRegister,
  });

  return (
    <div className={styles.container}>
      <div className={styles.registrationContainer}>
        <h2 className={styles.createAccount}>Create Account</h2>
        <div className={styles.socialIcons}>
          <FontAwesomeIcon icon={faGoogle} className={styles.icon} />
          <FontAwesomeIcon icon={faApple} className={styles.icon} />
          <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
        </div>
        <div className={styles.loginText}>
          Already have an account?{" "}
          <a className={styles.linkk} href="/Login">
            Log in
          </a>
        </div>
        <form
          onSubmit={registerForm.handleSubmit}
          className={styles.registrationForm}
        >
          <h6>Email</h6>
          <div className={styles.inputRow}>
            <input
              type="email"
              name="email"
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className={styles.input}
              placeholder="Email"
            />
            {registerForm.errors.email && registerForm.touched.email && (
              <div className={styles.error}>{registerForm.errors.email}</div>
            )}
          </div>
          <h6>First Name</h6>
          <div className={styles.inputRow}>
            <input
              type="text"
              name="firstName"
              value={registerForm.values.firstName}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className={styles.inputField}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={registerForm.values.lastName}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className={styles.inputField}
              placeholder="Last Name"
            />
          </div>
          <div className={styles.inputRow}>
            <h6>Password</h6>
            <input
              type="password"
              name="password"
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className={styles.input}
              placeholder="Password"
            />
            {registerForm.errors.password && registerForm.touched.password && (
              <div className={styles.error}>{registerForm.errors.password}</div>
            )}
          </div>
          <div className={styles.inputRow}>
            <h6>Notification</h6>
            <input
              type="text"
              name="notification"
              value={registerForm.values.notification}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className={styles.input}
              placeholder="Notification"
            />
            {registerForm.errors.notification &&
              registerForm.touched.notification && (
                <div className={styles.error}>
                  {registerForm.errors.notification}
                </div>
              )}
          </div>
          <div className={styles.inputRow}>
            <h6>Mobile Number</h6>
            <input
              type="tel"
              name="phoneNumber"
              value={registerForm.values.phoneNumber}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className={styles.input}
              placeholder="Mobile Number"
            />
            {registerForm.errors.phoneNumber &&
              registerForm.touched.phoneNumber && (
                <div className={styles.error}>
                  {registerForm.errors.phoneNumber}
                </div>
              )}
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="allowsPromotions" className={styles.linkk}>
              Allow Promotions:
            </label>
            <input
              type="checkbox"
              name="allowsPromotions"
              checked={registerForm.values.allowsPromotions}
              onChange={registerForm.handleChange}
              className={styles.checkbox}
            />
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="allowsSMS" className={styles.linkk}>
              Allow SMS:
            </label>
            <input
              type="checkbox"
              name="allowsSMS"
              checked={registerForm.values.allowsSMS}
              onChange={registerForm.handleChange}
              className={styles.checkbox}
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? <span className={styles.spinner}></span> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
