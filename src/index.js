import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://127.0.0.1:4000/",
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
