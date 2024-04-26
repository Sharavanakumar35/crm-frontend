// import React, { createContext, useContext, useState, useEffect } from "react";
// import jobServices from "../services/jobServices";
// import userServices from "../services/userServices";
// import Alert from '@mui/material/Alert';

// const Context = createContext();


// export const ContextProvider = ({ children }) => {

//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [user, setUser] = useState(null);
//   const [allUsers, setAllUsers] = useState([]);

//   const [handleSearchChangeFn, setHandleSearchChangeFn] = useState(null);
    
//   const signIn = async (username, password) => {
//     try {
//         const response = await userServices.signin(username, password);
//         setToken(response.data.token);
//         localStorage.setItem('token', response.data.token); // Use the updated token value
//         return (<Alert variant="filled" severity="success">
//           Login Successfull
//         </Alert>)
//     } catch (error) {
//         console.error("Error logging in user:", error);
//         return ( <Alert variant="filled" severity="error">
//           {error.response.data.message}
//         </Alert>)
//     }
// }


// const signOut = async () => {
//     try {
//         await userServices.signout();
//         setToken(null); // This line can be removed
//         localStorage.removeItem('token');
//     } catch (error) {
//         console.error("Error signing out: ", error);
//     }
// }


// const getAllUsers = async() => {
//   try {
//     const response = await userServices.getAllUsers();
//     setAllUsers(response.data.users);
//   } catch (error) {
//     console.log("Error fetching users: ", error);
//     alert("Error fetching users");
//   }
// }

// const getUser = async() => {
//   try {
//     const response = await userServices.getUser();
//     setUser(response.data.user);
//   } catch (error) {
//     console.error("Error fetching profile details: ", error); 
//     alert("Error fetching profile details");
//   }
// }

// const updateUser = async(editedUser) => {
//   console.log(editedUser);
//   try {
//     await userServices.updateUser(editedUser);
//     alert("Profile Updated");
//     getUser();
//   } catch (error) {
//     console.error("Error updating profile: ", error);
//   }
// }

// const enableMail = async(emailPass) => {
//   console.log(emailPass);
//   try {
//     await userServices.enableMail(emailPass);
//     alert("Email Pass Updated");
//     getUser();
//   } catch (error) {
//     console.error("Error updating pass for the email: ", error);
//   }
// }
//   // Effect to fetch job data when component mounts
//   useEffect(() => {
//     if (token) {
//       getAllJobs();
//       getUser();
//     }
//   }, [token]);

//   // Function to fetch all jobs
//   const getAllJobs = async () => {
//     try {
//       const response = await jobServices.getAllJobs();
//       setJobs(response.data); // Assuming jobServices returns data in the format { data: [...] }
//       if (handleSearchChangeFn) {
//         handleSearchChangeFn(); // Trigger handleSearchChange if it's set
//       }
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     }
//   };

//   const getJob = async (id) => {
//     try {
//       const response = await jobServices.getJob(id);
//       setSelectedJob(response.data);
//     //   return response.data;
//     } catch (error) {
//       console.error(`Error fetching job with ID ${id}:`, error);
//     }
//   };

//   // Function to delete a job
//   const deleteJob = async (id) => {
//     try {
//       await jobServices.deleteJob(id);
//       alert("Job deleted!");
//       getAllJobs(); // Refresh job list after deletion
//     } catch (error) {
//       console.error("Error deleting job: ", error);
//     }
//   };

//   // Function to create a new job
//   const createJob = async (newJob) => {
//     try {
//       await jobServices.createJob(newJob);
//       alert("Job created!");
//       getAllJobs(); // Refresh job list after creation
//     } catch (error) {
//       console.error("Error creating job: ", error);
//     }
//   };
  
//   const sendMail = async (email = null, subject = null, message = null, html = null, attachments = null) => {
//     try {
//       await jobServices.sendMail(email, subject, message);
//       alert("Email Sent");
//     } catch (error) {
//       console.error("Error sending email: ", error)
//     }
//   }

//   // Function to update a job
//   const updateJob = async (id, updatedJob) => {
//     try {
//       await jobServices.updateJob(id, updatedJob);
//       alert("Job updated!");
//       getAllJobs(); // Refresh job list after update
//     } catch (error) {
//       console.error("Error updating job:", error);
//     }
//   };

//   const assignJob = async (id, updatedJob) => {
//     try {
//       await jobServices.assignJob(id, updatedJob);
//       alert("Job assigned!");
//       getAllJobs(); // Refresh job list after update
//     } catch (error) {
//       console.error("Error updating job:", error);
//     }
//   }

//   // Make the job data and functions available to child components
//   return (
//     <Context.Provider
//       value={{ user, token, updateUser, signIn, assignJob, jobs, selectedJob, setSelectedJob, getAllJobs, deleteJob, createJob, updateJob, getJob, sendMail, enableMail, signOut, setHandleSearchChangeFn }}
//     >
//       {children}
//     </Context.Provider>
//   );
// };

// // Custom hook to consume job data and functions
// export const useContexts = () => {
//   return useContext(Context);
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import jobServices from "../services/jobServices";
import userServices from "../services/userServices";
import Alert from '@mui/material/Alert';

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [handleSearchChangeFn, setHandleSearchChangeFn] = useState(null);


  const signUp = async (payload) => {

    try {
      await userServices.signup(payload);
      setAlerts([...alerts, {type: 'success', message: 'Signup successfull'}]) 
    } catch (error) {
      console.error("Error signing up:", error);
      setAlerts([...alerts, {type: 'error', message: error.response.data.message}]);
    }
  }

  const signIn = async (username, password) => {
    try {
      const response = await userServices.signin(username, password);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token); // Use the updated token value
      setAlerts([...alerts, { type: 'success', message: 'Login Successful' }]);
    } catch (error) {
      console.error("Error logging in user:", error);
      setAlerts([...alerts, { type: 'error', message: error.response.data.message }]);
    }
  }

  const signOut = async () => {
    try {
      await userServices.signout();
      setToken(null); // This line can be removed
      localStorage.removeItem('token');
    } catch (error) {
      console.error("Error signing out: ", error);
      setAlerts([...alerts, { type: 'error', message: 'Error signing out' }]);
    }
  }

  const getAllUsers = async() => {
    try {
      const response = await userServices.getAllUsers();
      setAllUsers(response.data.users);
    } catch (error) {
      console.log("Error fetching users: ", error);
      setAlerts([...alerts, { type: 'error', message: 'Error fetching users' }]);
    }
  }

  const getUser = async() => {
    try {
      const response = await userServices.getUser();
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching profile details: ", error); 
      setAlerts([...alerts, { type: 'error', message: 'Error fetching profile details' }]);
    }
  }

  const updateUser = async(editedUser) => {
    console.log(editedUser);
    try {
      await userServices.updateUser(editedUser);
      setAlerts([...alerts, { type: 'success', message: 'Profile Updated' }]);
      getUser();
    } catch (error) {
      console.error("Error updating profile: ", error);
      setAlerts([...alerts, { type: 'error', message: 'Error updating profile' }]);
    }
  }

  const enableMail = async(emailPass) => {
    console.log(emailPass);
    try {
      await userServices.enableMail(emailPass);
      setAlerts([...alerts, { type: 'success', message: 'Email Pass Updated' }]);
      getUser();
    } catch (error) {
      console.error("Error updating pass for the email: ", error);
      setAlerts([...alerts, { type: 'error', message: 'Error updating pass for the email' }]);
    }
  }

  // Effect to fetch job data when component mounts
  useEffect(() => {
    if (token) {
      getAllJobs();
      getUser();
    }
  }, [token]);

  // Function to fetch all jobs
  const getAllJobs = async () => {
    try {
      const response = await jobServices.getAllJobs();
      setJobs(response.data); // Assuming jobServices returns data in the format { data: [...] }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setAlerts([...alerts, { type: 'error', message: 'Error fetching jobs' }]);
    }
  };

  const getJob = async (id) => {
    try {
      const response = await jobServices.getJob(id);
      setSelectedJob(response.data);
    } catch (error) {
      console.error(`Error fetching job with ID ${id}:`, error);
      setAlerts([...alerts, { type: 'error', message: `Error fetching job with ID ${id}` }]);
    }
  };

  // Function to delete a job
  const deleteJob = async (id) => {
    try {
      await jobServices.deleteJob(id);
      setAlerts([...alerts, { type: 'success', message: 'Job Deleted' }]);
      getAllJobs(); // Refresh job list after deletion
    } catch (error) {
      console.error("Error deleting job: ", error);
      setAlerts([...alerts, { type: 'error', message: 'Error deleting job' }]);
    }
  };

  // Function to create a new job
  const createJob = async (newJob) => {
    try {
      await jobServices.createJob(newJob);
      setAlerts([...alerts, { type: 'success', message: 'Job created' }]);
      getAllJobs(); // Refresh job list after creation
    } catch (error) {
      console.error("Error creating job: ", error);
      setAlerts([...alerts, { type: 'error', message: 'Error creating job' }]);
    }
  };
  
  const sendMail = async (email = null, subject = null, message = null, html = null, attachments = null) => {
    try {
      await jobServices.sendMail(email, subject, message);
      setAlerts([...alerts, { type: 'success', message: 'Email Sent' }]);
    } catch (error) {
      console.error("Error sending email: ", error)
      setAlerts([...alerts, { type: 'error', message: 'Error sending email' }]);
    }
  }

  // Function to update a job
  const updateJob = async (id, updatedJob) => {
    try {
      await jobServices.updateJob(id, updatedJob);
      setAlerts([...alerts, { type: 'success', message: 'Job updated' }]);
      getAllJobs(); // Refresh job list after update
    } catch (error) {
      console.error("Error updating job:", error);
      setAlerts([...alerts, { type: 'error', message: 'Error updating job' }]);
    }
  };

  const assignJob = async (id, updatedJob) => {
    try {
      await jobServices.assignJob(id, updatedJob);
      setAlerts([...alerts, { type: 'success', message: 'Job assigned' }]);
      getAllJobs(); // Refresh job list after update
    } catch (error) {
      console.error("Error updating job:", error);
      setAlerts([...alerts, { type: 'error', message: 'Error updating job' }]);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlerts([]);
    }, 5000); // Clear alerts after 5 seconds
    return () => clearTimeout(timer);
  }, [alerts]);

  // Make the job data and functions available to child components
  return (
    <Context.Provider
      value={{ signUp, user, token, setToken, updateUser, alerts, setAlerts, assignJob, jobs, selectedJob, setSelectedJob, getAllJobs, deleteJob, createJob, updateJob, getJob, sendMail, enableMail, signOut, setHandleSearchChangeFn }}
    >
      {alerts.map((alert, index) => (
        <Alert key={index} variant="filled" severity={alert.type} style={{position: 'absolute', top: '1rem', right: '1rem'}}>
          {alert.message}
        </Alert>
      ))}
      {children}
    </Context.Provider>
  );
};

// Custom hook to consume context values
export const useContexts = () => {
  return useContext(Context);
};
