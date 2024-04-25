import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import userServices from "../services/userServices";
import { FileUploader } from "react-drag-drop-files";
import avatar from '../assets/avatar.png'
const SignUp = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    role: "",
  });
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();

  const fileTypes = ["JPG", "PNG", "GIF", "PDF"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError("Passwords don't match");
      return;
    }

    // Simulating signup process
    console.log(formData);
    setSignUpError("");
    // Perform signup action here username, password, phone, email, location, role
    userServices
      .signup(
        formData.username,
        formData.password,
        formData.phone,
        formData.email,
        formData.location,
        formData.role
      )
      .then((response) => {
        console.log(response);
        alert("Sign up successfull");
        navigate("/login");
      })
      .catch((error) => {
        alert("Error Signing Up: ", error.message);
        console.error(error);
      });
  };

  return (
   
      <div className="loginCard">
        <h2 className="loginTitle">Sign Up</h2>
        <p>
          Already a User? <a href="/login">login</a>
        </p>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            {/* <Form.Label>Username</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="inputField mb-3"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="inputField mb-3"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="inputField mb-3"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            {/* <Form.Label>Confirm Password</Form.Label> */}
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="inputField mb-3"
            />
            {passwordMatchError && (
              <Form.Text className="text-danger">
                {passwordMatchError}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            {/* <Form.Label>Phone Number</Form.Label> */}
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              name="phone"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="inputField mb-3"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid phone number.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLocation">
            {/* <Form.Label>Location</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="Enter location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="inputField mb-3"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your location.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRole">
            {/* <Form.Label>Role</Form.Label> */}
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="inputField mb-3"
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select a role.
            </Form.Control.Feedback>
          </Form.Group>

          {signUpError && <Alert variant="danger">{signUpError}</Alert>}

          <Button variant="primary" type="submit" className="loginBtn mt-3">
            Sign Up
          </Button>
        </Form>
      </div>

  );
};

export default SignUp;
