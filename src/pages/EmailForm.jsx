import React, { useState } from 'react';
import { Form, Row, Col, Button } from "react-bootstrap";
import { useContexts } from '../contextAPI/context';
import { FileUploader } from "react-drag-drop-files";

const EmailForm = ({email}) => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    to: email,
    subject: '',
    message: ''
  });
  const [sendError, setSendError] = useState('');

  const {sendMail} = useContexts();


  const fileTypes = ["JPG", "PNG", "GIF", "PDF"];
  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
  };

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
    
    sendMail(formData.to, formData.subject, formData.message,null,null);

    setSendError('');
    // Perform email sending action here
  };

  return (
    <div className="emailCard">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <Form.Group controlId="formBasicTo">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter recipient email"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  className="inputField"
                  required
                />
                <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
              </Form.Group>
          </Row>
            
          <Row className='mb-3'>
            <Form.Group controlId="formBasicSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="inputField"
                required
              />
              <Form.Control.Feedback type="invalid">Please enter the subject.</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className='mb-3'>
            <Form.Group controlId="formBasicMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="inputField"
                required
              />
              <Form.Control.Feedback type="invalid">Please enter a message.</Form.Control.Feedback>
            </Form.Group>
          </Row>
            {sendError && <Alert variant="danger">{sendError}</Alert>}


            <Row className='mb-3'>
              <Form.Group as={Col} md="12" controlId="formnbasicattachments">
                <Form.Label>Attachments</Form.Label>
                <FileUploader handleChange={handleFileChange} name="file" types={fileTypes} multiple={true} hoverTitle="Drop here"/>
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit" className='mt-3 loginBtn'>
              Send Email
            </Button>
      </Form>
    </div>
  );
};

export default EmailForm;
