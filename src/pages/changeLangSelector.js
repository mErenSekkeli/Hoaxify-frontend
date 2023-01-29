import React from "react";
import {withTranslation} from "react-i18next";
import { changeLanguage } from "../api/apiCalls.js";


class ChangeLangSelector extends React.Component {
    onChangeLanguage = language => {
        const {i18n} = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    render() {
        return (
            <div>
                <img src="https://flagcdn.com/h20/us.png" alt="United States" onClick={() => this.onChangeLanguage('en')} style={{cursor:'pointer'}}></img>
                &nbsp;
                <img src="https://flagcdn.com/h20/tr.png" alt="turkish" onClick={() => this.onChangeLanguage('tr')} style={{cursor:'pointer'}}></img>
            </div>
        );
    }
}
export default withTranslation()(ChangeLangSelector);