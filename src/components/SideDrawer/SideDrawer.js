import React from "react";
import { Link } from "react-router-dom";

import "./SideDrawer.css";
const ipcRenderer = window.require("electron").ipcRenderer;
const data = {
  filters: {
    securityFilter: false,
    familyFilter: false,
    privacyFilter: false
  }
};

const sideDrawer = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <Link to={"/"} onClick={props.closeSideDrawer}>
            Home
          </Link>
        </li>

        <li>
          <Link to={"/about"} onClick={props.closeSideDrawer}>
            About
          </Link>
        </li>

        <li>
          <Link to={"/help"} onClick={props.closeSideDrawer}>
            Help
          </Link>
        </li>

        <li>
          <Link to={"/help"} onClick={props.closeSideDrawer}>
            Buy Privacy filter
          </Link>
        </li>
        <li>
          <a href="/" onClick={() => ipcRenderer.send("quit-app", data)}>
            Quit
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default sideDrawer;
