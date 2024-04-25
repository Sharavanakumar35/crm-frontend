import React, { useState, useEffect } from 'react'; // Import useState from React
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useContexts } from '../contextAPI/context';
import { Link } from 'react-router-dom';
import EmailForm from './EmailForm';
import { Modal } from 'react-bootstrap';
import DropdownSearchBox from '../components/DropdownSearch';
import ProgressBar from 'react-bootstrap/ProgressBar';
import MailPass from './MailPass';

const Home = () => {
  const {user, selectedJob, setSelectedJob, jobs, deleteJob, setHandleSearchChangeFn } = useContexts();
  const [show, setShow] = useState(false);

  const [applicants, setApplicants] = useState([]);

  const handleSearchChange = (searchTerm, attribute) => {
    // console.log(searchTerm, attribute);
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    const trimmedAttr = attribute.trim().toLowerCase();
    const trimmedAttribute = getAttribute(trimmedAttr);

    let filteredApplicants;
    if (trimmedSearchTerm !== '') {
      filteredApplicants = jobs.jobs.filter(job => {
            return job[trimmedAttribute] && job[trimmedAttribute].toLowerCase().includes(trimmedSearchTerm);
        });
    } else {
      filteredApplicants = jobs.jobs;
    }

    setApplicants(filteredApplicants);
  };

  useEffect(() => {
    setHandleSearchChangeFn(() => handleSearchChange); // Update handleSearchChangeFn in UsersContext
  }, [setHandleSearchChangeFn]);

  useEffect(() => {   
    setApplicants(jobs.jobs || []);
  }, [jobs]);

  if (!jobs.jobs) {
    return <div>Loading...</div>;
  }

  
  const handleDelete = (event, id) => {
    event.preventDefault();
    console.log("Delete function called")
    const isConfirmed = window.confirm("Are you sure you want to delete this job?");
  
    if (isConfirmed) {
      deleteJob(id);
    }
  }

  const handleMail = (event, job) => {
    event.preventDefault();
    setSelectedJob({ job });
    setShow(true);
  }
  

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {user?.permissions.mail ? 'Compose Mail' : 'Email Credentials'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user?.permissions.mail ? <EmailForm email={selectedJob?.job?.email}></EmailForm>
          : <MailPass email={user?.email} />}
         
        </Modal.Body>
      </Modal>

      <div className="d-flex flex-column">
        <h1 className="text-center">My Job Applicants</h1>
        <p className="mt-1 text-center" style={{fontSize: '20px', marginBottom: '40px', color: 'grey'}}>Manage your job applicants</p>
        <DropdownSearchBox
          searchTerm={handleSearchChange}
          handleSearchChange={handleSearchChange}
        ></DropdownSearchBox>
        <div style={{ width: "80vw", marginTop: '20px' }}>
          <MDBTable align="top" className="w-100 mt-4">
            <MDBTableHead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Position</th>
                <th scope="col">Job Type</th>
                <th scope="col">Experience</th>
                <th scope="col">Performance</th>
                <th scope="col">Status</th>
                <th scope="col">Company</th>
                <th scope="col">Job Location</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {applicants.length > 0 ? (
                applicants.map((job, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={job.image}
                          alt=""
                          style={{ width: "45px", height: "45px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{job.name}</p>
                          <p className="text-muted mb-0">{job.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1 text-center">
                        {job.position}
                      </p>
                    </td>
                    <td>
                      <p className="text-muted mb-0 text-center">
                        {job.jobType}
                      </p>
                    </td>
                    <td>
                      <p className="text-muted mb-0 text-center">
                        {job.experience}
                      </p>
                    </td>
                    <td>
                      <ProgressBar
                        now={job.performance}
                        label={`${job.performance}%`}
                      />
                    </td>
                    <td>
                      <MDBBadge color={getStatusColor(job.jobStatus)} pill>
                        {job.jobStatus}
                      </MDBBadge>
                    </td>
                    <td>
                      <p className="text-muted mb-0">{job.company}</p>
                    </td>
                    <td>{job.jobLocation}</td>
                    <td>
                    <MDBBtn
                          color="info"
                          rounded
                          size="sm"
                          onClick={(event) => handleMail(event, job)}
                        >
                         {user?.permissions.mail ? 'Mail' : 'Enable Mail'}
                        </MDBBtn>
                      {user?.permissions.edit && (
                        <Link to={`/dashboard/editJob/${job._id}`}>
                          <MDBBtn
                            color="primary"
                            rounded
                            size="sm"
                            className="ms-1"
                          >
                            Edit
                          </MDBBtn>
                        </Link>
                      )}
                      {user?.permissions.delete && (
                        <MDBBtn
                          color="danger"
                          rounded
                          size="sm"
                          className="ms-1"
                          onClick={(event) => handleDelete(event, job._id)}
                        >
                          Delete
                        </MDBBtn>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <tr>
                    <td
                      colSpan="9"
                      style={{ textAlign: "center", padding: '20%' }}
                    >
                      You don't have any job applicants registered yet!
                    </td>
                  </tr>
                </>
              )}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </>
  );
}

// Helper function to determine badge color based on job status
const getStatusColor = (status) => {
  switch (status) {
    case 'open':
      return 'success';
    case 'closed':
      return 'danger';
    case 'pending':
      return 'secondary';
    default:
      return 'secondary';
  }
};

export default Home;

const getAttribute = (attribute) => {
  console.log('attribute = ', attribute);
  switch (attribute) {
    case 'location':
      return 'jobLocation';
    case 'status':
      return 'jobStatus';
    case 'jobtype':
      return 'jobType';
    default: 
      return attribute;
  }
}