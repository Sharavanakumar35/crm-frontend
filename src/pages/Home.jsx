import React, { useState, useEffect } from 'react'; // Import useState from React
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useContexts } from '../contextAPI/context';
import { Link, useNavigate } from 'react-router-dom';
import EmailForm from './EmailForm';
import { Modal } from 'react-bootstrap';
import DropdownSearchBox from '../components/DropdownSearch';
import ProgressBar from 'react-bootstrap/ProgressBar';
import MailPass from './MailPass';
import Pagination  from "https://cdn.skypack.dev/rc-pagination@3.1.15";
import './Home.css';
import AssignJob from './AssignJob';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Home = () => {
  const {user, selectedJob, setSelectedJob, jobs, deleteJob, setHandleSearchChangeFn } = useContexts();

  const [mailShow, setMailShow] = useState(false);
  const [assignShow, setAssignShow] = useState(false);

  const [createdBy, setCreatedBy] = useState(null);

  const [applicants, setApplicants] = useState([]);

  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);

  const navigate = useNavigate();

    const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(datatableUsers.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    }

    const getData = (current, pageSize) => {
      // Normally you should get the data from the server
      return applicants.slice((current - 1) * pageSize, current * pageSize);
    };
    const PaginationChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize)
    }

    const PrevNextArrow = (current, type, originalElement) => {
        if (type === 'prev') {
            return <button><i className="fa fa-angle-double-left"></i></button>;
        }
        if (type === 'next') {
            return <button><i className="fa fa-angle-double-right"></i></button>;
        }
        return originalElement;
    }

  const handleSearchChange = (searchTerm, attribute) => {
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
    const isConfirmed = window.confirm("Are you sure you want to delete this job?");
  
    if (isConfirmed) {
      deleteJob(id);
    }
  }

  const handleMail = (event, job) => {
    event.preventDefault();
    setSelectedJob({ job });
    setMailShow(true);
  }
  
  const handleAssign = (event, jobId, jobCreatedBy) => {
    event.preventDefault();
    setAssignShow(true);
    setCreatedBy({jobId: jobId, jobCreatedBy: jobCreatedBy});
  }


  const handleEdit = (event, jobId) => {
      event.preventDefault();
      navigate(`/dashboard/editJob/${jobId}`);
  }
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));


  return (
    <>
      <Modal
        show={mailShow}
        onHide={() => setMailShow(false)}
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

      <Modal
        show={assignShow}
        onHide={() => setAssignShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Assign applicant to:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <AssignJob jobId={createdBy?.jobId} createdBy={createdBy?.jobCreatedBy} />
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
                <th scope="col">Current Company</th>
                <th scope="col">Job Location</th>
                {user?.role === 'admin' && <th scope="col">Created By</th>}
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {applicants.length > 0 ? (
                getData(current, size).map((job, index) => (
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
                    {user?.role === 'admin' && <td>{job.createdBy}</td>}
                    <td>
                  
                    {user?.permissions.mail ? <MDBBtn
                          color="info"
                          rounded
                          size="sm"
                          onClick={(event) => handleMail(event, job)}
                        >
                         Mail
                    </MDBBtn> :
                    
                    <HtmlTooltip
                    title={
                     'To proceed with emailing the applicant, please enter your email credentials by clicking the button.'
                    }
                  >
                    <MDBBtn
                          color="info"
                          rounded
                          size="sm"
                          onClick={(event) => handleMail(event, job)}
                        >
                         Enable Mail
                    </MDBBtn>
                  </HtmlTooltip>
                    
                    }
                      {user?.permissions.edit && (       
                          <MDBBtn
                            color="primary"
                            rounded
                            size="sm"
                            className="ms-1"
                            onClick={(event) => handleEdit(event, job._id)}
                          >
                            Edit
                          </MDBBtn>
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
                      {
                        user?.permissions.assign && (
                          <MDBBtn
                          color="success"
                          rounded
                          size="sm"
                          className="ms-1"
                          onClick={(event) => handleAssign(event, job._id, job.createdBy)}
                        >
                          Assign To
                        </MDBBtn>
                        )
                      }
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
          <Pagination
                                    className="pagination-data"
                                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                                    onChange={PaginationChange}
                                    total={applicants.length}
                                    current={current}
                                    pageSize={size}
                                    showSizeChanger={false}
                                    itemRender={PrevNextArrow}
                                    onShowSizeChange={PerPageChange}
                                />
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
  switch (attribute) {
    case 'location':
      return 'jobLocation';
    case 'status':
      return 'jobStatus';
    case 'job type':
      return 'jobType';
    case 'current company':
      return 'company';
    case 'created by':
      return 'createdBy';
    default: 
      return attribute;
  }
}