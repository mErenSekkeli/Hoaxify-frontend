import React from "react";
import UserSignUp from "../pages/userSignUp";
import UserLogin from "../pages/UserLogin";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import TopBar from "../components/TopBar.js";
import { connect } from "react-redux";
//import { Authentication } from "../shared/AuthenticationContext";

class App extends React.Component {
  //static contextType = Authentication;

  render(){
    const isLoggedIn = this.props.isLoggedIn;
    return (
      <div>
          <Router>
            <TopBar />
              <Switch>
              <Route path="/" exact component={HomePage} />
              {!isLoggedIn && (
              <Route path="/login" exact component={UserLogin} />
              )}
              {!isLoggedIn &&
              <Route path="/signup" exact component={UserSignUp} />
              }
              {isLoggedIn &&
             ( <Route path="/user/:username" exact component={UserPage} />)
              }
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

}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn
  };
};


export default connect(mapStateToProps)(App);
