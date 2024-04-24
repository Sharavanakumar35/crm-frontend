import { createBrowserRouter, BrowserRouter, Route } from 'react-router-dom';
import Home from '../pages/Home'
import Landing from '../pages/Landing';

const SidebarData = [
    {
      name: "CRM",
      iconName: "grid-alt",
    },
    // {
    //     name: "Home",
    //     iconName: "home",
    //     type: "solid",
    //     path: "home",
    // },
    {
      name: "Applicants",
      iconName: "list-ul",
      type: "solid",
      path: "myJobApplicants",
  },
    {
      name: "Add a Job",
      iconName: "user-plus",
      type: "solid",
      path: 'createJob'
    },
    {
      name: "Profile",
      iconName: "user-circle",
      type: "solid",
      path: 'profile'
    },
    // {
    //   name: "Messages",
    //   iconName: "envelope",
    //   type: "solid",
    //   path: 'messages'
    // },
    // {
    //   name: "Resources",
    //   iconName: "spreadsheet",
    //   type: "solid",
    //   path: '/explore'
    // },
    // {
    //   name: "Starred",
    //   iconName: "star",
    //   type: "solid",
    //   path: '/explore'
    // },
    // {
    //   name: "Settings",
    //   iconName: "cog",
    //   type: "solid",
    //   path: '/explore'
    // },
    {
        name: "Log Out",
        iconName: "log-out",
        color: "red",
        rotate: "180",
    }
];


export default SidebarData;
  