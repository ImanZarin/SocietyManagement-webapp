import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "bootswatch/dist/solar/bootstrap.min.css";
import "./App.css";
import MainComponent from "./components/main/MainComponent";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:3005/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Route path="/" component={MainComponent} />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
