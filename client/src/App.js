import React, { useState } from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";

// Components
import NotFound from "./component/NotFound";
import LoginForm from "./component/LoginForm";
import AuthedRoute from "./component/AuthedRoute";
import SignUpForm from "./component/SignUpForm";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <div className="outside">
        <div className="inside">
          <section className="App-header">
            <Switch>
              <Route
                path="/"
                exact
                render={() => <LoginForm authed={user} getStatus={setUser} />}
              />

              <Route
                path="/signUp"
                render={() => <SignUpForm authed={user} getStatus={setUser} />}
              />

              <Route
                path="/sucessSignIn"
                render={() => <AuthedRoute authed={user} />}
              />

              <Route component={NotFound} />
            </Switch>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
