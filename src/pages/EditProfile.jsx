import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useContexts } from '../contextAPI/context';

const EditProfile = ({setIsProfileEdit}) => {
  const {user, updateUser} = useContexts(); 
  const [formData, setFormData] = useState(user);
  const [validated, setValidated] = useState(false);

  console.log('editProfileUser = ', user);

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

    // Submit the form data
    console.log(formData);

    const isConfirmed = window.confirm("Are you sure to change the profile details?");
        if (isConfirmed) {
          updateUser(formData);
          setIsProfileEdit(false);
        }
  };

  return (
    <>
     
        <div className="editProfileCard">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="inputField mb-3"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="inputField mb-3"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="inputField mb-3"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid phone number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="inputField mb-3"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your location.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicFacebookUrl">
              <Form.Label>Facebook URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter Facebook URL"
                name="facebookUrl"
                value={formData.facebookUrl}
                onChange={handleChange}
                className="inputField mb-3"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid Facebook URL.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicInstagramUrl">
              <Form.Label>Instagram URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter Instagram URL"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleChange}
                className="inputField mb-3"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid Instagram URL.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicTwitterUrl">
              <Form.Label>Twitter URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter Twitter URL"
                name="twitterUrl"
                value={formData.twitterUrl}
                onChange={handleChange}
                className="inputField mb-3"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid Twitter URL.
              </Form.Control.Feedback>
            </Form.Group>

            <div className='d-flex justify-content-between align-items-center'>
                <Button variant="primary" type="submit" className='loginBtn mt-3'>
                Save Changes
                </Button>

                <Button variant="secondary" className='loginBtn mt-3' onClick={() => setIsProfileEdit(false)}>
                Cancel
                </Button>
            </div>
          </Form>
        </div>
     
    </>
  );
};

export default EditProfile;
