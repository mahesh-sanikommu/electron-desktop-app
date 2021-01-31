import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import MainContainer from "./components/Main/MainContainer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="header-arrow" />
          <MainContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
