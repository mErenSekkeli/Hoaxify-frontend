import React from "react";
import Input from "../components/Input";
import { changeLanguage } from "../api/apiCalls.js";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls.js";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";

class UserLogin extends React.Component{

    state = {
        username: null,
        password: null,
        error: null
    }

    onChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value,
            error : null
        });

    }

    onClickLogin = async (event) => {
        event.preventDefault();
        const {username, password} = this.state;
        
        this.setState({error: null});

        try{
            await login({
                username,
                password
            });
        }catch(apiError){
            if(apiError.response.data.message){
                this.setState({error: apiError.response.data.message});
            }
        }
    }

    onChangeLanguage = language => {
        const {i18n} = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    render(){
        const {error, username, password} = this.state;
        const {t, pendingApiCall} = this.props;
        const btnEnabled = username && password && username.length > 4 && password.length > 7;
        return(
            <div className="row">
            <div className="col-md-8 border border-primary border-2 rounded-4 my-4" style={{margin: 'auto', borderColor: '#14335F'}}>
            <form>
                <h1 className="text-center">{t('Login')}</h1>
                <Input name="username" label={t('User Name')} onChange={this.onChange} />
                <Input name="password" label={t('Password')} onChange={this.onChange} type="password" />
                {(error) && <div className="alert alert-danger">{t(error)}</div>}
                <div className="text-center mt-4 mb-2">
                    <ButtonWithProgress onClick={this.onClickLogin} disabled={!btnEnabled || pendingApiCall} pendingApiCall={pendingApiCall} redirecting={t('Redirecting')} text={t('Login')} />
                </div>
            </form>
            </div>
            </div>
        );
    }
}
const UserLoginPage = withTranslation()(UserLogin);
const UserLoginPageWithApiProgress = withApiProgress(UserLoginPage, '/api/1.0/auth');
export default UserLoginPageWithApiProgress;