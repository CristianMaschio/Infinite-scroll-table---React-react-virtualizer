import React from "react";

import logo from "./logo.svg";
import "./App.css";
import Table from "./components/Table";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Cristian Maschio</h1>
      </header>
      <Table/>
    </div>
  );
}

export default App;
