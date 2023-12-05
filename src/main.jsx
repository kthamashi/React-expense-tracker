import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuthContext } from "./auth/AuthProvider";

import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* As you see, we have wrapper our whole application with the AuthProvider we have */}
    {/* This means that everythng that is below this has access to the context(state) of it */}
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
