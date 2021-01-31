import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSpiderDnsInfo } from "../../actions/spiderActions";
import Navigation from "./Navigation";
import { setMenuSelection } from "../../actions/internalActions";

export class MainContainer extends Component {
  state = {
    dnsValue: "",
    currentDnsValues: []
  };
  componentDidMount() {
    this.props.setMenuSelection();
    this.props.fetchSpiderDnsInfo();
  }

  render() {
    return <Navigation {...this.props} />;
  }
}

MainContainer.propTypes = {
  fetchSpiderDnsInfo: PropTypes.func.isRequired,
  setMenuSelection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  spiderDns: state.data.spiderDns,
  path: state.data.path
});

export default connect(
  mapStateToProps,
  {
    fetchSpiderDnsInfo,
    setMenuSelection
  }
)(MainContainer);
