# CRM JobConnect

Welcome to CRM JobConnect, a job portal application designed to streamline your recruitment process. Whether you're an admin or a regular user, JobConnect offers a range of features to help you manage job applicants efficiently.

## Features

### User Authentication
- **Signup**: New users can sign up as either an admin or a regular user using `/users/signup` endpoint. 
- **Token-Based Authentication**: Upon signing in, a token is generated and stored in cookies, enabling secure access to other functionalities and APIs.

### Profile Management
- **View Profile**: Users can view their profile details.
- **Edit Profile**: Users can update their profile information using the `GET api/users/getUser` and `POST api/users/updateUser` APIs.

### Job Management
- **Create Job Applicants**: Admins and users can create new job applicants using the `POST api/jobs/createJob` API.
- **Edit Job Applicants**: Users can edit job applicant details using the `PUT api/jobs/:id` endpoint.
- **Mail to Job Applicants**: Users can send emails to job applicants using the `api/jobs/sendMail` API.

### Admin Privileges
- **Delete Job Applicants**: Admins have the privilege to delete job applicants using the `DELETE api/jobs/:id` endpoint.
- **Assign Job Applicants**: Admins can assign job applicants to other users or admins using the `PUT api/jobs/assignJob/:id` API.

## Getting Started
To start using CRM JobConnect, follow these simple steps:

1. **Access the Frontend**: Visit the [CRM JobConnect Frontend](https://jobconnect-crm.netlify.app/) deployed on Netlify.
2. **Access the Backend**: Visit the [CRM JobConnect Backend](https://crm-backend-im9w.onrender.com) deployed on Render.
3. **Sign Up or Log In**: Sign up as a new user or log in with the following credentials:
    - **Username**: Shark
    - **Password**: Shark@35
4. **Explore Features**: Once logged in, explore the various features and functionalities available. As a signed-in admin, you can create sample job applicants and manage them efficiently.
5. **Start Using**: Start managing your job applicants efficiently with CRM JobConnect!

## PROFILE PAGE

![Screenshot 2024-04-26 151601](https://github.com/Sharavanakumar35/crm-frontend/assets/136878187/dfbec15b-2611-4ebc-a3f4-d226d34c2e93)

## MY JOB APPLICANTS (ADMIN)

![Screenshot 2024-04-26 151513](https://github.com/Sharavanakumar35/crm-frontend/assets/136878187/41786d87-c37d-4a41-b126-4f881c1dacd1)

## MY JOB APPLICANTS (USER)

![Screenshot 2024-04-26 152223](https://github.com/Sharavanakumar35/crm-frontend/assets/136878187/e858e891-e2f1-49ba-a8e2-05fb97d9bf1f)


That's it! You're all set to get started with CRM JobConnect. If you encounter any issues or have any questions, feel free to reach out.

## Contributors
- [Sharavanakumar B S](https://github.com/Sharavanakumar35)
