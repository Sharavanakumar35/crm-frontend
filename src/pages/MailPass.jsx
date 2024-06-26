import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useContexts } from '../contextAPI/context';
import { useOutlet } from 'react-router-dom';

const MailPass = ({email}) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: email,
    pass: ''
  });
  const [subError, setSubError] = useState('');

  const {enableMail} = useContexts();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
    setSubError('');

    enableMail(formData);
    // Perform login action here
  };

  return (
    <>
    <div className="emailCard">
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
            className="inputField mb-3"
          required
        />
        <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="text"
          placeholder="password"
          name="pass"
          value={formData.pass}
          onChange={handleChange}
            className="inputField mb-3"
          required
        />
        <Form.Control.Feedback type="invalid">Please enter your pass key.</Form.Control.Feedback>
      </Form.Group>

      {subError && <Alert variant="danger">{subError}</Alert>}

      <Button variant="primary" type="submit" className='loginBtn mt-3'>
        Submit
      </Button>
    </Form>

    <div className='mt-4' style={{color: 'grey', fontWeight: '100'}}>
      Note: If you're using Gmail, we recommend you to enter your gmail Passkey instead of password as Gmail may block sign-in attempts from external app.    </div>
    </div>
    </>
  );
};

export default MailPass;
