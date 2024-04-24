import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useContexts } from "../contextAPI/context";
import { useParams } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';


const EditJob = ({ editMode }) => {
  const formStructure = {
    name: "",
    email: "",
    position: "",
    experience: "",
    performance: "",
    jobType: "",
    jobLocation: "",
    image: "",
    jobStatus: "",
    company: "",
  };

  const [formData, setFormData] = useState(formStructure);
  const { selectedJob, setSelectedJob, getJob, updateJob, createJob } = useContexts();
  const [validated, setValidated] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    console.log(editMode);
    if (id && editMode) {
      getJob(id);
    } else {
      setSelectedJob(null);
    }
  }, [editMode]);

  useEffect(() => {
    if (selectedJob) {
      setFormData(selectedJob.job);
    } else {
      setFormData(formStructure);
    }
  }, [selectedJob]);
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      !editMode ? createJob(formData) : updateJob(id, formData);
      
    }
  };

  return (

      <div className="editCard">
        <h2>{!editMode ? 'Create a Job Applicant' : 'Edit Job Applicant'}</h2>
        <Form className="mt-4 w-100" onSubmit={handleSubmit} noValidate validated={validated}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="inputField"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="inputField"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide an email.
                    </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="inputField"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide an image URL.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="8" controlId="position">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="inputField"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a position.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="experience">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="inputField"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a experience.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">   
                <Form.Group as={Col} md="12" controlId="company">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="inputField"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a company.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="jobStatus">
                  <Form.Label>Job Status</Form.Label>
                  <Form.Control
                    as="select"
                    type="text"
                    name="jobStatus"
                    value={formData.jobStatus}
                    onChange={handleChange}
                    className="inputField"
                    required
                  >
                    <option value="">Select Status</option>
          {/* Map through the job types and render options */}
          {["pending", "open", "closed"]
            .map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please provide a job status.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="jobType">
                  <Form.Label>Job Type</Form.Label>
                  <Form.Control
          as="select"
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          required
        >
          <option value="">Select Job Type</option>
          {["part-time", "full-time", "contract", "internship"]
            .map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
        </Form.Control> 
                  <Form.Control.Feedback type="invalid">
                    Please provide a job type.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="9" controlId="performance">
                  <Form.Label>Performance</Form.Label>
                  <ProgressBar now={formData.performance} label={`${formData.performance}%`} />
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="performance">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="double"
                    name="performance"
                    value={formData.performance}
                    onChange={handleChange}
                    className="inputField"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a experience.
                  </Form.Control.Feedback>
                </Form.Group>

              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="jobLocation">
                  <Form.Label>Job Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="jobLocation"
                    value={formData.jobLocation}
                    onChange={handleChange}
                    className="inputField"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a job location.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button type="submit" className="mt-3 loginBtn">Update</Button>
            </Form>
      </div>

  );
};

export default EditJob;
