import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import FirstPage from "./FirstPage";

function AuthedRoute({ authed }) {
  const worngAccess = () => {
    alert("잘못된 접근입니다. 로그인 페이지로 이동합니다.");
    return <Redirect to="/" />;
  };

  return (
    <div>
      <h1>Nice to see you!</h1>
      {authed ? <FirstPage /> : worngAccess()}
    </div>
  );
}

export default AuthedRoute;
