import { instance, protectedInstance } from './instances';

const jobServices = {
    // define the method to get all jobs
    getAllJobs: async () => {
        // send a GET request to the API
        return protectedInstance.get('/jobs');
    },
    // define the method to get a job by its ID
    getJob: async (id) => {
        // send a GET request to the API
        return protectedInstance.get(`/jobs/${id}`);
    },
    // define the method to create a new job
    createJob: async (job) => {
        // send a POST request to the API
        return protectedInstance.post('/jobs', job);
    },
    // define the method to update a job
    updateJob: async (id, job) => {
        // send a PUT request to the API
        return protectedInstance.put(`/jobs/${id}`, job);
    },
    // define the method to delete a job
    deleteJob: async (id) => {
        // send a DELETE request to the API
        return protectedInstance.delete(`/jobs/${id}`);
    },

    sendMail: async (email, subject, message, html, attachments) => {
        const payload = {email, subject, message, html, attachments};
        return protectedInstance.post(`/jobs/sendMail`, payload);
    }
}

export default jobServices;