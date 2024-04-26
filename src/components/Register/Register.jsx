import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  async function callRegister(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    try {
      let { data } = await axios.post(`https://api-dev.rescounts.com/api/v1/users`, reqBody);
      console.log(data);
      if (data.success) {
        navigate("/Login");
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.response.data.message);
    }
  }

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "First name is too short")
      .max(50, "First name is too long")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name is too short")
      .max(50, "Last name is too long")
      .required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    phoneNumber: Yup.string()
      .matches(/^01[0-2]\d{8}$/, "Invalid phone number")
      .required("Phone number is required"),
    allowsPromotions: Yup.boolean().required(),
    allowsSMS: Yup.boolean().required(),
    notification: Yup.string().required("Notification token is required"),
  });

  const registerForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
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
    <>
      <div className="w-75 mx-auto my-5">
        <h2 className="mb-3">Register Now:</h2>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}
        <form onSubmit={registerForm.handleSubmit} className="row g-2">
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="form-control"
            />
            {registerForm.errors.email && registerForm.touched.email ? (
              <div className="alert alert-danger">
                {registerForm.errors.email}
              </div>
            ) : null}
          </div>
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={registerForm.values.firstName}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="form-control"
            />
            {registerForm.errors.firstName && registerForm.touched.firstName ? (
              <div className="alert alert-danger">
                {registerForm.errors.firstName}
              </div>
            ) : null}
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={registerForm.values.lastName}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="form-control"
            />
            {registerForm.errors.lastName && registerForm.touched.lastName ? (
              <div className="alert alert-danger">
                {registerForm.errors.lastName}
              </div>
            ) : null}
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="form-control"
            />
            {registerForm.errors.password && registerForm.touched.password ? (
              <div className="alert alert-danger">
                {registerForm.errors.password}
              </div>
            ) : null}
          </div>
          <div className="col-md-6">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number:
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={registerForm.values.phoneNumber}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="form-control"
            />
            {registerForm.errors.phoneNumber && registerForm.touched.phoneNumber ? (
              <div className="alert alert-danger">
                {registerForm.errors.phoneNumber}
              </div>
            ) : null}
          </div>
          <div className="col-md-6">
            <label htmlFor="allowsPromotions" className="form-check-label">
              Allows Promotions:
            </label>
            <input
              type="checkbox"
              name="allowsPromotions"
              id="allowsPromotions"
              checked={registerForm.values.allowsPromotions}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="form-check-input"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="allowsSMS" className="form-check-label">
              Allows SMS:
            </label>
            <input
              type="checkbox"
              name="allowsSMS"
              id="allowsSMS"
              checked={registerForm.values.allowsSMS}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="form-check-input"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="notification" className="form-label">
                Notification:
              </label>
              <input
                type="text"
                name="notification"
                id="notification"
                value={registerForm.values.notification}
                onChange={registerForm.handleChange}
                onBlur={registerForm.handleBlur}
                className="form-control"
              />
              {registerForm.errors.notification && registerForm.touched.notification ? (
                <div className="alert alert-danger">
                  {registerForm.errors.notification}
                </div>
              ) : null}
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={registerForm.isSubmitting}
              >
                {isLoading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : null}
                Register
              </button>
            </div>
          </form>
        </div>
      </>
    );
    }
    