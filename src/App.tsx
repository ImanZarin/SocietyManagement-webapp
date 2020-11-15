import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "bootswatch/dist/solar/bootstrap.min.css";
import "./App.css";
import MainComponent from "./components/main/MainComponent";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={MainComponent} />
    </BrowserRouter>
  );
}

export default App;
