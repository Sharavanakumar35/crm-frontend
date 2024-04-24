import {instance, protectedInstance} from '../services/instances.js';

// define the authentication service
const userServices = {
    // define the login method
    signin: async (username, password) => {
        // define the data to be sent to the API
        const data = {
            username,
            password
        };
        // send a POST request to the API
        return instance.post('/users/signin', data, {withCredentials: true});
    },
    // define the register method
    signup: async (username, password, phone, email, location, role) => {
        // define the data to be sent to the API
        const data = {
            username, password, phone, email, location, role
        };
        // send a POST request to the API
        return instance.post('/users/signup', data);
    },

    // get the currently logged in user
    getUser: async () => {
        return protectedInstance.get('/users/getUser');
    },

    updateUser: async (user) => {
        return protectedInstance.put(`/users/updateUser`, user);
    },

    enableMail: async (user) => {
        return protectedInstance.put('/users/enableMail', user);
    },
    // signout the user
    signout: async () => {
        return protectedInstance.get('/users/logout');
    }
};

// export the service
export default userServices;