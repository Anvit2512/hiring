import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from '@react-oauth/google';  // <<== IMPORT here

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="815613395507-lnl1cjafft5cmbub355es8a5590egvs1.apps.googleusercontent.com"> {/* <<== WRAP here */}
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
      {/* <Index></Index> */}
    </BrowserRouter>
  </GoogleOAuthProvider>
);
