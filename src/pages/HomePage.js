import React from "react";
import ChangeLangSelector from "./ChangeLangSelector.js";
import { changeLanguage } from "../api/apiCalls.js";
const HomePage = () => {
  function  onChangeLanguage (language) {
        const {i18n} = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }
    return (
        <div className="container">
            <h1 className="text-center">Home Page</h1>
            <div className="m-5">
            <ChangeLangSelector />
            </div>
        </div>
    );
}
export default HomePage;