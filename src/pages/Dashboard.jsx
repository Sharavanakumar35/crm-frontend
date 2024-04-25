import React from "react";
import dashboardAvatar from "../assets/dashboardAvatar.png";


const Dashboard = () => {
  return (
    <div className="dashboard">
      <div>
        <div className="whiteBox">
          <h1 className="welcomeMsg">Welcome Aboard!</h1>
          <div className="p-4 text-center">
            <h2 style={{ color: "#009688", textShadow: "1px 1px black" }}>
              Let's make hiring a breeze together on a most trusted CRM platform: <span style={{color: 'black'}}>JobConnect.</span>  
            </h2>
          </div>

          <div className="d-flex justify-content-between align-items-center">
          <div className="whiteBox-left">
            <h3
              className="mb-3"
              style={{ color: "#607D8B" }}
            >
              Excited to get started?
            </h3>

            <h5 style={{color: 'grey'}}>
              Click on the profile icon to explore your account. From there, you
              can customize your settings, view your profile details, and even
              enable mail sending options if needed.
            </h5>
          </div>
          <div className="m-2 p-2">
            <img src={dashboardAvatar} height="400px" width="400px" />
          </div>
          <div className="whiteBox-right" >
            <h3
              className="mb-3"
              style={{ color: "#607D8B" }}
            >
              Ready to start recruiting?
            </h3>

            <h5 style={{color: 'grey'}}>
              Head over to the Job Applicants section. Here, you can effortlessly
              create, edit, or delete job applicants to build your dream team.
            </h5>
          </div>
        </div>

        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
