import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { CrudContextProvider } from "./context/crudContext";
import { QueryClient, QueryClientProvider } from "react-query";
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <CrudContextProvider>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </CrudContextProvider>
  </Router>
);
