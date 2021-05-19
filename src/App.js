import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import LogIn from "./Component/LogIn";
import LogOut from "./Component/LogOut";
import SignUp from "./Component/SignUp";
import { auth } from "./firebase_config";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user === true) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <Navbar user={user} />
        <Switch>
          <Route exact path="/">
            <Home user={user} />
          </Route>
          <Route path="/LogIn">
            <LogIn />
          </Route>
          <Route path="/SignUp" component={SignUp} />
          <Route path="/LogOut" component={LogOut} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
