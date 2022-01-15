import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import HttpsRedirect from "react-https-redirect";
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <HttpsRedirect>
  <BrowserRouter>
    <App />
  </BrowserRouter>  
  </HttpsRedirect>,
  document.getElementById("root")
);

serviceWorker.unregister();
