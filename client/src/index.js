import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from 'react-apollo-hooks';
import ScrollMemory from "react-router-scroll-memory";
import { HelmetProvider } from "react-helmet-async";

import { client } from 'components/Apollo/Apollo';
import App from "./App";
import GlobalState from "./context/globalState";
import Loading from 'components/Loading/Loading';
import * as serviceWorker from "./serviceWorker";
import "./index.scss";

const helmetContext = {};

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <GlobalState>
        <HelmetProvider context={helmetContext}>
          <ScrollMemory />
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        </HelmetProvider>
      </GlobalState>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
