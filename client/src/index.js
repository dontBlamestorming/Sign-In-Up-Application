import React from "react";
import ReactDOM from "react-dom";

/* 현재 주소와 관련된 정보를 props로 조회가 가능하다 */
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
