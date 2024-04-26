import React, { createContext, useContext, useState, useEffect } from "react";
import jobServices from "../services/jobServices";
import userServices from "../services/userServices";


const Context = createContext();


export const ContextProvider = ({ children }) => {

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const [handleSearchChangeFn, setHandleSearchChangeFn] = useState(null);
    
  const signIn = async (username, password) => {
    try {
        const response = await userServices.signin(username, password);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token); // Use the updated token value
    } catch (error) {
        console.error("Error logging in user:", error);
    }
}

const signOut = async () => {
    try {
        await userServices.signout();
        setToken(null); // This line can be removed
        localStorage.removeItem('token');
    } catch (error) {
        console.error("Error signing out: ", error);
    }
}


const getAllUsers = async() => {
  try {
    const response = await userServices.getAllUsers();
    setAllUsers(response.data.users);
    console.log(response);
  } catch (error) {
    console.log("Error fetching users: ", error);
    alert("Error fetching users");
  }
}

const getUser = async() => {
  try {
    const response = await userServices.getUser();
    setUser(response.data.user);
    console.log(response);
  } catch (error) {
    console.error("Error fetching profile details: ", error); 
    alert("Error fetching profile details");
  }
}

const updateUser = async(editedUser) => {
  console.log(editedUser);
  try {
    await userServices.updateUser(editedUser);
    alert("Profile Updated");
    getUser();
  } catch (error) {
    console.error("Error updating profile: ", error);
  }
}

const enableMail = async(emailPass) => {
  console.log(emailPass);
  try {
    await userServices.enableMail(emailPass);
    alert("Email Pass Updated");
    getUser();
  } catch (error) {
    console.error("Error updating pass for the email: ", error);
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
      if (handleSearchChangeFn) {
        handleSearchChangeFn(); // Trigger handleSearchChange if it's set
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const getJob = async (id) => {
    try {
      const response = await jobServices.getJob(id);
      setSelectedJob(response.data);
    //   return response.data;
    } catch (error) {
      console.error(`Error fetching job with ID ${id}:`, error);
    }
  };

  // Function to delete a job
  const deleteJob = async (id) => {
    try {
      await jobServices.deleteJob(id);
      alert("Job deleted!");
      getAllJobs(); // Refresh job list after deletion
    } catch (error) {
      console.error("Error deleting job: ", error);
    }
  };

  // Function to create a new job
  const createJob = async (newJob) => {
    try {
      await jobServices.createJob(newJob);
      alert("Job created!");
      getAllJobs(); // Refresh job list after creation
    } catch (error) {
      console.error("Error creating job: ", error);
    }
  };
  
  const sendMail = async (email = null, subject = null, message = null, html = null, attachments = null) => {
    try {
      await jobServices.sendMail(email, subject, message);
      alert("Email Sent");
    } catch (error) {
      console.error("Error sending email: ", error)
    }
  }

  // Function to update a job
  const updateJob = async (id, updatedJob) => {
    try {
      await jobServices.updateJob(id, updatedJob);
      alert("Job updated!");
      getAllJobs(); // Refresh job list after update
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const assignJob = async (id, updatedJob) => {
    try {
      await jobServices.assignJob(id, updatedJob);
      alert("Job assigned!");
      getAllJobs(); // Refresh job list after update
    } catch (error) {
      console.error("Error updating job:", error);
    }
  }

  // Make the job data and functions available to child components
  return (
    <Context.Provider
      value={{ user, token, updateUser, signIn, assignJob, jobs, selectedJob, setSelectedJob, getAllJobs, deleteJob, createJob, updateJob, getJob, sendMail, enableMail, signOut, setHandleSearchChangeFn }}
    >
      {children}
    </Context.Provider>
  );
};

// Custom hook to consume job data and functions
export const useContexts = () => {
  return useContext(Context);
};
