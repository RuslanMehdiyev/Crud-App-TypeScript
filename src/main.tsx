import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { CrudContextProvider } from "./context/crudContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <CrudContextProvider>
      <App />
    </CrudContextProvider>
  </Router>
);
