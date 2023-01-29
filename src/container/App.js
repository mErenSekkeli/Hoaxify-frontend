import React from "react";
import UserSignUp from "../pages/userSignUp";
import UserLogin from "../pages/userLogin";
import ChangeLangSelector from "../pages/changeLangSelector";

function App() {
  return (
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
  );
}

export default App;
