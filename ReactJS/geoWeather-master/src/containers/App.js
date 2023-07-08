import React, { Component } from "react";
import SearchBar from "./search_bar";
import Weather from "./weather";
import "../App.css";
import "../App.less";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
        <Weather />
      </div>
    );
  }
}

export default App;
