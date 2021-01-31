import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSpiderDnsInfo } from "../../actions/spiderActions";
import { Container } from "semantic-ui-react";
import { setMenuSelection } from "../../actions/internalActions";

const ipcRenderer = window.require("electron").ipcRenderer;
const dnsFilterValues = {
  securityFilter: ["13.52.19.96", "54.149.180.236"],
  familyFilter: ["8.8.8.8 ", "8.8.4.4"],
  privacyFilter: ["75.75.75.75", " 75.75.76.76"]
};

export class DnsContainer extends Component {
  state = {
    filterValues: {
      securityFilter: false,
      familyFilter: false,
      privacyFilter: false
    }
  };
  componentDidMount() {
    this.props.setMenuSelection();
    this.props.fetchSpiderDnsInfo();
    ipcRenderer.send("save-dnsInfo-locally", dnsFilterValues);
    ipcRenderer.send("get-app-values");
  }

  setDns = e => {
    // below ip address were given by bhavin
    //13.52.19.96
    //54.149.180.236
    let arr = {
      dns:
        this.state.dnsFilterValues[e.target.id][0] +
        " " +
        this.state.dnsFilterValues[e.target.id][1],
      filters: {
        securityFilter:
          e.target.id === "securityFilter" && e.target.checked ? true : false,
        familyFilter:
          e.target.id === "familyFilter" && e.target.checked ? true : false,
        privacyFilter:
          e.target.id === "privacyFilter" && e.target.checked ? true : false
      }
    };
    this.setState({ filterValues: arr.filters });
    if (e.target.checked) {
      arr.dns = this.state.dnsFilterValues[e.target.id];
      ipcRenderer.send("set-dns", arr);
    } else {
      arr.dns = "empty";
      ipcRenderer.send("set-dns", arr);
    }
  };

  render() {
    const updateOnlineStatus = () => {
      ipcRenderer.send(
        "online-status-changed",
        navigator.onLine ? "online" : "offline"
      );
    };
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    updateOnlineStatus();
    ipcRenderer.on("send-app-values", (event, arg) => {
      this.setState({
        dnsFilterValues: arg.dnsValues,
        filterValues: arg.filters
      });
      ipcRenderer.removeAllListeners("send-app-values");
    });
    return (
      <Container style={{ paddingTop: 15, marginTop: "55px" }}>
        <div
          style={{
            padding: 20,
            border: "0px solid black",
            color: "black",
            background: "white"
          }}
        >
          Security Filter
          <div className="ui fitted toggle checkbox" style={{ float: "right" }}>
            <input
              type="checkbox"
              id="securityFilter"
              tabIndex="0"
              onChange={this.setDns}
              checked={
                this.state.filterValues
                  ? this.state.filterValues.securityFilter
                  : null
              }
            />
            <label />
          </div>
        </div>

        <div className="ui divider" />

        <div
          style={{
            padding: 20,
            border: "0px solid black",
            color: "black",
            background: "white"
          }}
        >
          Family Filter
          <div className="ui fitted toggle checkbox" style={{ float: "right" }}>
            <input
              type="checkbox"
              id="familyFilter"
              tabIndex="1"
              onChange={this.setDns}
              checked={
                this.state.filterValues
                  ? this.state.filterValues.familyFilter
                  : null
              }
            />
            <label />
          </div>
        </div>

        <div className="ui divider" />

        <div
          style={{
            padding: 20,
            border: "0px solid black",
            color: "black",
            background: "white"
          }}
        >
          Privacy Filter
          <div className="ui fitted toggle checkbox" style={{ float: "right" }}>
            <input
              type="checkbox"
              id="privacyFilter"
              tabIndex="2"
              onChange={this.setDns}
              checked={
                this.state.filterValues
                  ? this.state.filterValues.privacyFilter
                  : null
              }
            />
            <label />
          </div>
        </div>

        <div className="ui divider" />
      </Container>
    );
  }
}

DnsContainer.propTypes = {
  fetchSpiderDnsInfo: PropTypes.func.isRequired,
  setMenuSelection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  spiderDns: state.data.spiderDns
});

export default connect(
  mapStateToProps,
  {
    fetchSpiderDnsInfo,
    setMenuSelection
  }
)(DnsContainer);
