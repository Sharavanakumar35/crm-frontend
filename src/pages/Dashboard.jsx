import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-bg ">
        <h1 className="welcomeMsg">Welcome to</h1>
        <h1 className="welcomeMsg">JobConnect. CRM</h1>
        <div className="p-4 text-center">
          <h2 style={{ color: "#009688", textShadow: "1px 1px black" }}>
            Let's make hiring a breeze together. Welcome aboard!
          </h2>
        </div>
        <div
          className="p-4"
        //   style={{
        //     borderBottom: "1px solid gray",
        //     borderTop: "1px solid gray",
        //   }}
        >
          <h3
            className="mb-3"
            style={{ color: "#607D8B", textShadow: "1px 1px black" }}
          >
            Excited to get started?
          </h3>

          <h4>
            Click on the profile icon to explore your account. From there, you
            can customize your settings, view your profile details, and even
            enable mail sending options if needed.
          </h4>
        </div>
        <div className="p-4" 
        // style={{ borderBottom: "1px solid gray" }}
        >
          <h3
            className="mb-3"
            style={{ color: "#607D8B", textShadow: "1px 1px black" }}
          >
            Ready to start recruiting?
          </h3>

          <h4>
            Head over to the Job Applicants section. Here, you can effortlessly
            create, edit, or delete job applicants to build your dream team.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
