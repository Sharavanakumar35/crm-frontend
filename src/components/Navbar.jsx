import React, { useState, useEffect } from "react";
import SidebarData from "./SidebarData";
import "./Navbar.css";
import "boxicons";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useContexts } from "../contextAPI/context";
import Dashboard from "../pages/Dashboard";
import Tooltip from "@mui/material/Tooltip";

import useMediaQuery from "./useMediaQuery"; // Uncomment if using the useMediaQuery hook

const Sidebar = () => {
  const changeSmall = useMediaQuery("(max-height: 550px)"); // Uncomment if using the useMediaQuery hook
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(1);
  const [animate, setAnimate] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { token, signOut } = useContexts();
  let delay = 1;
  const navigate = useNavigate();

  const [currentRoute, setCurrentRoute] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    console.log(token);
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    setAnimate(true);
    let timer = setTimeout(() => setAnimate(false), delay * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [active, delay]);

  const handleLogOut = () => {
    console.log("Log out called");
    signOut()
      .then(() => {
        console.log("User logged out");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      className="d-flex justify-content-between h-100 overflow-y-scroll"
      style={{ background: "aliceblue" }}
    >
      <div className={`sidebar ${expanded && "expanded"}`}>
        {SidebarData.map((item, index) => {
          let middle = !(index === 0 || index === SidebarData.length - 1);
          return (
            <React.Fragment key={index}>
              {index === 0 && (
                <div
                  className={`boxicon-container ${
                    expanded && "expanded-boxicon-container"
                  }`}
                  onClick={() => setExpanded(!expanded)}
                  onMouseEnter={() => middle && setHovered(index)}
                  onMouseLeave={() => middle && setHovered(null)}
                >
                  {expanded ? (
                    <box-icon
                      class={`${middle && "boxicon"} ${
                        !middle && "first-and-last-trash-fix"
                      } ${active === index && "active"}`}
                      size={changeSmall ? "sm" : "md"}
                      name={expanded ? item.collapseIcon : item.expandIcon}
                      type={item.type}
                      color={
                        hovered === index || active === index
                          ? "white"
                          : item.color
                      }
                      animation={active === index && animate ? "tada" : ""}
                      rotate={item.rotate}
                    ></box-icon>
                  ) : (
                    <Tooltip title={item.name} placement="right-end">
                      <box-icon
                        class={`${middle && "boxicon"} ${
                          !middle && "first-and-last-trash-fix"
                        } ${active === index && "active"}`}
                        size={changeSmall ? "sm" : "md"}
                        name={expanded ? item.collapseIcon : item.expandIcon}
                        type={item.type}
                        color={
                          hovered === index || active === index
                            ? "white"
                            : item.color
                        }
                        animation={active === index && animate ? "tada" : ""}
                        rotate={item.rotate}
                      ></box-icon>
                    </Tooltip>
                  )}

                  <p
                    className={`description ${expanded && "show-description"} ${
                      active === index && "active-description"
                    }`}
                  >
                    {item.name}
                  </p>
                </div>
              )}
              {item && item.path && item.name !== "Log Out" && (
                <Link
                  to={item.path}
                  className={`boxicon-container ${
                    expanded && "expanded-boxicon-container"
                  }`}
                  onMouseEnter={() => middle && setHovered(index)}
                  onMouseLeave={() => middle && setHovered(null)}
                  onClick={() => {
                    if (middle) setActive(index);
                    if (index === 0) setExpanded(!expanded);
                  }}
                >
                  {expanded ? (
                    <box-icon
                      class={`${middle && "boxicon"} ${
                        !middle && "first-and-last-trash-fix"
                      } ${active === index && "active"}`}
                      size={changeSmall ? "sm" : "md"}
                      name={item.iconName}
                      type={item.type}
                      color={
                        hovered === index || active === index
                          ? "white"
                          : item.color
                      }
                      animation={active === index && animate ? "tada" : ""}
                      rotate={item.rotate}
                    ></box-icon>
                  ) : (
                    <Tooltip title={item.name} placement="right-end">
                      <box-icon
                        class={`${middle && "boxicon"} ${
                          !middle && "first-and-last-trash-fix"
                        } ${active === index && "active"}`}
                        size={changeSmall ? "sm" : "md"}
                        name={item.iconName}
                        type={item.type}
                        color={
                          hovered === index || active === index
                            ? "white"
                            : item.color
                        }
                        animation={active === index && animate ? "tada" : ""}
                        rotate={item.rotate}
                      ></box-icon>
                    </Tooltip>
                  )}

                  <p
                    className={`description ${expanded && "show-description"} ${
                      active === index && "active-description"
                    }`}
                  >
                    {item.name}
                  </p>
                </Link>
              )}
              {item && item.name === "Log Out" && (
                <div
                  className={`boxicon-container ${
                    expanded && "expanded-boxicon-container"
                  }`}
                  onClick={handleLogOut}
                  onMouseEnter={() => middle && setHovered(index)}
                  onMouseLeave={() => middle && setHovered(null)}
                >
                  {expanded ? (
                    <box-icon
                      class={`${middle && "boxicon"} ${
                        !middle && "first-and-last-trash-fix"
                      } ${active === index && "active"}`}
                      size={changeSmall ? "sm" : "md"}
                      name={item.iconName}
                      type={item.type}
                      color={
                        hovered === index || active === index
                          ? "white"
                          : item.color
                      }
                      animation={active === index && animate ? "tada" : ""}
                      rotate={item.rotate}
                    ></box-icon>
                  ) : (
                    <Tooltip title={item.name} placement="right-end">
                      <box-icon
                        class={`${middle && "boxicon"} ${
                          !middle && "first-and-last-trash-fix"
                        } ${active === index && "active"}`}
                        size={changeSmall ? "sm" : "md"}
                        name={item.iconName}
                        type={item.type}
                        color={
                          hovered === index || active === index
                            ? "white"
                            : item.color
                        }
                        animation={active === index && animate ? "tada" : ""}
                        rotate={item.rotate}
                      ></box-icon>
                    </Tooltip>
                  )}

                  <p
                    className={`description ${expanded && "show-description"} ${
                      active === index && "active-description"
                    }`}
                  >
                    {item.name}
                  </p>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="outlet">
        <div className="inner-outlet container-fluid m-4 d-flex justify-content-center">
          {(currentRoute === "/dashboard/" ||
            currentRoute === "/dashboard") && <Dashboard />}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
