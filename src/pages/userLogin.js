import React from "react";
import Input from "../components/Input";
import { changeLanguage } from "../api/apiCalls.js";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls.js";

class UserLogin extends React.Component{

    state = {
        username: null,
        password: null,
        pendingApiCalls: null,
        errors: {}
    }


    onChange = (event) => {
        const {t} = this.props;
        const {name, value} = event.target;
        const  {errors} = {...this.state};
        errors[name] = undefined;

        this.setState({
            [name]: value,
            errors
        });

    }

    onClickLogin = async (event) => {
        event.preventDefault();
        const {username, password} = this.state;

        this.setState({pendingApiCall: true});

        try{
            const response = await login({
                username,
                password
            });
        }catch(error){
            if(error.response.data.validationErrors){
                this.setState({errors: error.response.data.validationErrors});
            }
        }

        this.setState({pendingApiCall: false});
    }

    onChangeLanguage = language => {
        const {i18n} = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    render(){
        const {pendingApiCall, errors} = this.state;
        const {userName, pass} = errors;
        const {t} = this.props;
        return(
            <body style={{backgroundImage : 'url(login_background.jpg)', backgroundSize: 'cover', height: '100vh'}}>
            <div className="container" >
            <div className="row">
            <div className="col-md-6 border border-primary border-2 rounded-4 my-4" style={{margin: 'auto', borderColor: '#14335F'}}>
            <form>
                <h1 className="text-center">{t('Login')}</h1>
                <Input name="username" label={t('User Name')} error={userName} onChange={this.onChange} />
                <Input name="password" label={t('Password')} error={pass} onChange={this.onChange} type="password" />
                <div className="text-center">
                    <button
                    name="signUpBtn"
                    className="btn btn-primary my-3"
                    onClick={this.onClickLogin}
                    disabled={pendingApiCall}>
                        {(pendingApiCall) && <span className="spinner-grow spinner-grow-sm"></span>}
                        {(!pendingApiCall) ? t('Login') : t('Redirecting')}</button>
                </div>
            </form>
            </div>
            <div>
            <div style={{marginLeft: '25%'}}>
                <img src="https://flagcdn.com/h20/us.png" alt="United States" onClick={() => this.onChangeLanguage('en')} style={{cursor:'pointer'}}></img>
                &nbsp;
                <img src="https://flagcdn.com/h20/tr.png" alt="turkish" onClick={() => this.onChangeLanguage('tr')} style={{cursor:'pointer'}}></img>
            </div>
            </div> 
            </div>
            </div>
            </body>
        );
    }
}
export default withTranslation()(UserLogin);