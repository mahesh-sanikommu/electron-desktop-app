import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { setMenuSelection } from "../../actions/internalActions";
const ipcRenderer = window.require("electron").ipcRenderer;

export class SettingsContainer extends Component {
  state = {
    dnsValue: "",
    currentDnsValues: []
  };
  componentDidMount() {
    this.props.setMenuSelection();
    ipcRenderer.send("quit-app");
  }

  render() {
    return (
      <Container>
        <div>Routing Works</div>
      </Container>
    );
  }
}

SettingsContainer.propTypes = {
  setMenuSelection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  spiderDns: state.data.spiderDns
});

export default connect(
  mapStateToProps,
  {
    setMenuSelection
  }
)(SettingsContainer);
