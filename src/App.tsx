import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "bootswatch/dist/solar/bootstrap.min.css";
import "./App.css";
import MainComponent from "./components/main/MainComponent";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { MyStorage } from "./shared/Enums";

function App() {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3005/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(MyStorage.token);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    //uri: "http://localhost:3005/graphql",
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
