import React from 'react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { useContexts } from './contextAPI/context';
import EditJob from './pages/EditJob';
import Profile from './pages/Profile';
import LogoWatermark from './components/LogoWatermark';
import Dashboard from './pages/Dashboard';

function App() {
  const { token } = useContexts();
  
  const isLoggedIn = () => {
    return !!token;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      children: [
        {
          path: "/signup",
          element: <Signup />
        },
        {
          path: "/login",
          element: <Login />
        }
      ],
    },
    {
      path: "/dashboard",
      element: <>
      <Navbar />
      <LogoWatermark /> {/* Add LogoWatermark component here */}
    </>,
      children: [
        {
          path: "myJobApplicants",
          element: <Home />
        },
        {
          path: "/dashboard/editJob/:id",
          element: <EditJob editMode={true} />
        },
        {
          path: "/dashboard/createJob",
          element: <EditJob editMode={false} />
        },
        {
          path: "profile",
          element: <Profile />
        }
      ],
      canActivate: isLoggedIn // Pass reference to isLoggedIn function directly
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
