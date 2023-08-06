import React from "react";
import ChangeLangSelector from "./ChangeLangSelector.js";
import { changeLanguage } from "../api/apiCalls.js";
import UserList from "../components/UserList.js";
import HoaxSubmit from "../components/HoaxSubmit.js";
import HoaxFeed from "../components/HoaxFeed.js";
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
                    <div className="col-md-12 mt-5">
                        <HoaxFeed/>
                    </div>
                </div>
                <div className="col-sm-4 mt-5">
                    <UserList/>
                </div>
            </div>
            <div className="p-3">
            <ChangeLangSelector />
            </div>
        </div>
    );
}
export default HomePage;