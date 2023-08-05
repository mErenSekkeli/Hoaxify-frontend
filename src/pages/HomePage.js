import React from "react";
import ChangeLangSelector from "./ChangeLangSelector.js";
import { changeLanguage } from "../api/apiCalls.js";
import UserList from "../components/UserList.js";
import HoaxSubmit from "../components/HoaxSubmit.js";
const HomePage = () => {
  function  onChangeLanguage (language) {
        const {i18n} = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 mt-5">
                    <HoaxSubmit/>
                </div>
                <div className="col-sm-4 mt-5">
                    <UserList/>
                </div>
            </div>
            <div className="m-5">
            <ChangeLangSelector />
            </div>
        </div>
    );
}
export default HomePage;