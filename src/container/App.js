import React from "react";
import UserSignUp from "../pages/userSignUp";
import UserLogin from "../pages/userLogin";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import TopBar from "../components/topBar";
function App() {
  return (
    <div>
        <Router>
          <TopBar />
            <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={UserLogin} />
            <Route path="/signup" exact component={UserSignUp} />
            <Route path="/user/:username" exact component={UserPage} />
            <Redirect to="/" />
            </Switch>
        </Router>
    </div>
    /*
    <body style={{backgroundImage : 'url(login_background.jpg)', backgroundSize: 'cover', height: '100vh'}}>
      <div className="container">
      <div className="row">
      <div className="col-md-6">
          <UserLogin />
      </div>
      <div className="col-md-6">
          <UserSignUp />
      </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <ChangeLangSelector/>
        </div>
      </div>
      </div>
    </body>
    */
  );
}

export default App;
