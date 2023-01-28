import React from "react";
import Input from "../components/Input";
import { changeLanguage } from "../api/apiCalls.js";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls.js";
import axios from "axios";
import ButtonWithProgress from "../components/ButtonWithProgress";

class UserLogin extends React.Component{

    state = {
        username: null,
        password: null,
        pendingApiCall: null,
        error: null
    }

    //this function is called after the component is rendered
    componentDidMount(){
        axios.interceptors.request.use(request => {
            this.setState({pendingApiCall: true});
            return request;
        });

        axios.interceptors.response.use(response => {
            this.setState({pendingApiCall: false});
            return response;
        }, error => {
            this.setState({pendingApiCall: false});
            throw error;
        });
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
        const {pendingApiCall, error, username, password} = this.state;
        const {t} = this.props;
        const btnEnabled = username && password && username.length > 4 && password.length > 7;
        return(
            <body style={{backgroundImage : 'url(login_background.jpg)', backgroundSize: 'cover', height: '100vh'}}>
            <div className="container" >
            <div className="row">
            <div className="col-md-6 border border-primary border-2 rounded-4 my-4" style={{margin: 'auto', borderColor: '#14335F'}}>
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