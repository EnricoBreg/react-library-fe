import ReactDOM from "react-dom/client";
import "./index.css";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap JS Bundle
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
