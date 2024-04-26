// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import { useContexts } from "../contextAPI/context";
// import { useNavigate } from "react-router-dom";
// import { MDBBtn } from 'mdb-react-ui-kit';
// import { FcGoogle,  } from "react-icons/fc";
// import { FaSquareFacebook } from "react-icons/fa6";
// import { FaApple } from "react-icons/fa6";

// const Login = () => {
//   const [validated, setValidated] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const [loginError, setLoginError] = useState('');
//   const {signIn} = useContexts();

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = e.currentTarget;
//     if (form.checkValidity() === false) {
//       e.stopPropagation();
//     }
//     setValidated(true);

//     signIn(formData.username, formData.password)
//     .then(res => {
//       setLoginError('');
//       navigate('/dashboard')
//     })
//     .catch(error => {
//       setLoginError('Enter valid username and password');
//     })   
//   };


//   return (
   
//       <div className="loginCard">
//         <h2 className="loginTitle">Sign In</h2>
//         <p>
//           New User? <a href="/signup">Register</a>
//         </p>
//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <Form.Group controlId="formBasicUsername">
//             {/* <Form.Label>Username</Form.Label> */}
//             <Form.Control
//               type="text"
//               placeholder="Enter username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="inputField mb-3"
//               required
//             />
//             <Form.Control.Feedback type="invalid">
//               Please enter your username.
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group controlId="formBasicPassword">
//             {/* <Form.Label>Password</Form.Label> */}
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="inputField"
//               required
//             />
//             <Form.Control.Feedback type="invalid">
//               Please enter your password.
//             </Form.Control.Feedback>
//           </Form.Group>

//           {loginError && <Alert variant="danger">{loginError}</Alert>}

//           <Button variant="primary" type="submit" className="mt-3 loginBtn">
//             Login
//           </Button>
//         </Form>

//         <div className="striped">
//           <span className="striped-line"></span>
//           <span className="striped-text">Or</span>
//           <span className="striped-line"></span>
//         </div>

//         <div className="method">
//           <div className="method-control">
//             <a href="#" className="method-action">
//             <FcGoogle className='me-2' />
//               <span>Sign in with Google</span>
//             </a>
//           </div>
//           <div className="method-control">
//             <a href="#" className="method-action">
//             <FaSquareFacebook
//             style={{
//               color: '#4f38ff',
//             }} className='me-2'
//             />
//               <span>Sign in with Facebook</span>
//             </a>
//           </div>
//           <div className="method-control">
//             <a href="#" className="method-action">
//               <FaApple
//                 style={{
//                   color:'#000000',
//                 }} className='me-2'
//               />
//               <span>Sign in with Apple</span>
//             </a>
//           </div>
//         </div>
//       </div>
   
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa6";
import userServices from '../services/userServices';
import { useContexts } from '../contextAPI/context';

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const {setToken, alerts, setAlerts} = useContexts();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await userServices.signin(formData.username, formData.password);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setLoginError('');
      setValidated(true);
      setAlerts([...alerts, { type: 'success', message: 'Login Successful' }])
      navigate('/dashboard');
    } catch (error) {
      setLoginError(error.response.data.message);
      setValidated(false);
    }
  };

  return (
    <div className="loginCard">
      <h2 className="loginTitle">Sign In</h2>
      <p>
        New User? <a href="/signup">Register</a>
      </p>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
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

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="inputField"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group>

        {loginError && <Alert variant="filled" severity="error" className='mt-2'>{loginError}</Alert>}

        <Button variant="primary" type="submit" className="mt-3 loginBtn">
          Login
        </Button>
      </Form>

      <div className="striped">
        <span className="striped-line"></span>
        <span className="striped-text">Or</span>
        <span className="striped-line"></span>
      </div>

      <div className="method">
        <div className="method-control">
          <a href="#" className="method-action">
            <FcGoogle className='me-2' />
            <span>Sign in with Google</span>
          </a>
        </div>
        <div className="method-control">
          <a href="#" className="method-action">
            <FaSquareFacebook
              style={{
                color: '#4f38ff',
              }} className='me-2'
            />
            <span>Sign in with Facebook</span>
          </a>
        </div>
        <div className="method-control">
          <a href="#" className="method-action">
            <FaApple
              style={{
                color: '#000000',
              }} className='me-2'
            />
            <span>Sign in with Apple</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
