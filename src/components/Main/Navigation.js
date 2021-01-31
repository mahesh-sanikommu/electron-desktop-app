import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

import React, { Suspense, lazy, Component } from "react";

import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import Backdrop from "../Backdrop/Backdrop";

// COMPONENTS
const DnsPage = lazy(() => import("../DnsButton/DnsContainer"));
const SettingsPage = lazy(() => import("../Settings/SettingsContainer"));

function FirstTab() {
  return <DnsPage />;
}

function SecondTab() {
  return <SettingsPage />;
}

class Navigation extends Component {
  state = {
    adminOpen: false,
    supportOpen: false,
    profileOpen: false,
    reportsOpen: false,
    activeItem: window.location.pathname,
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name
    });
  };

  logoutClicked = () => {
    window.location.href = "/logout";
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <Router>
        <div>
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer
            show={this.state.sideDrawerOpen}
            closeSideDrawer={this.drawerToggleClickHandler}
          />
          {backdrop}
          <Link to={"/"} id="mainPage" />
          <Suspense
            fallback={<div className="ui active large centered loader" />}
          >
            <Switch>
              <Route exact path="/" component={FirstTab} />
              <Route path="/settings" component={SecondTab} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    );
  }
}

export default Navigation;
