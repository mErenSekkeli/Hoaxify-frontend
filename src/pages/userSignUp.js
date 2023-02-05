import React from "react";
import {signup, changeLanguage} from  "../api/apiCalls";
import Input from "../components/Input";
import {withTranslation} from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from "react-redux";
import {signupHandler} from '../redux/authActions';

class UserSignUp extends React.Component{
//bu class component. bir de functional component var app.js gibi

    state = {
        name:null,
        surname:null,
        userName: null,
        pass:null,
        pass2:null,
        errors : {}
    }

   //bu hepsini tek bir yere topluyor
    onChange = event => {
        /*
        const value = event.target.value;
        const name = event.target.name;
        */
        //Kısa değişken parçalama
        const {t} = this.props;
        const {value, name} = event.target;
        const errors = {...this.state.errors};//obje kopyalama
        errors[name] = undefined;
        if(name === 'pass' || name === 'pass2'){
            if(name === 'pass' && value !== this.state.pass2){
                errors.pass2 = t('Password Mismatch');
            }else if(name === 'pass2' && value !== this.state.pass){
                errors.pass2 = t('Password Mismatch');
            }else{
                errors.pass2 = undefined;
            }
        }
        this.setState({
             [name]:value,
             errors
        });
    }

    onClickSignUp = async event => {
        event.preventDefault();
        const {name, surname, userName, pass, pass2} = this.state;
        const {dispatch, history} = this.props;
        const push = history.push;
        //eğer değişken ismiyle body'deki isim aynı ise direkt olarak yazabiliriz
        const body = {
            name,
            surname,
            userName,
            pass,
            pass2
        };
        
        //package.json dosyasında proxy ayarı yaptığımız için domaini yazmamıza gerek yok
        try{
            await dispatch(signupHandler(body));
            push('/');
        }catch(error){
            console.log(error.response.data);
            if(error.response.data.validationErrors)
                this.setState({errors: error.response.data.validationErrors});
        }
        /*signup(body).then((response) => {
            this.setState({pendingApiCall:false});
        }).catch((error) =>{
            this.setState({pendingApiCall:false});
        });*/
    }

    onChangeLanguage = language => {
        const {i18n} = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    render(){
        const {errors} = this.state;
        const {name, surname, userName, pass, pass2} = errors;
        const {t, pendingApiCall} = this.props;
        return(
            <div className="row">
            <div className="col-md-6 border border-primary border-2 rounded-4 my-4" style={{margin: 'auto', borderColor: '#14335F'}}>
            <form>
                <h1 className="text-center">{t('Sign Up')}</h1>
                <Input name="name" label={t('Name')} error={name} onChange={this.onChange} />
                <Input name="surname" label={t('Surname')} error={surname} onChange={this.onChange} />
                <Input name="userName" label={t('User Name')} error={userName} onChange={this.onChange} />
                <Input name="pass" label={t('Password')} error={pass} onChange={this.onChange} type="password" />
                <Input name="pass2" label={t('Password Again')} error={pass2} onChange={this.onChange} type="password" />
                <div className="text-center mt-3 mb-2">
                    <ButtonWithProgress onClick={this.onClickSignUp} disabled={pendingApiCall || pass2 !== undefined} redirecting={t('Redirecting')} pendingApiCall={pendingApiCall} text={t('Sign Up')} />
                </div>
            </form>
            </div>
            </div>
        );
    }
}

const case1 = withTranslation()(UserSignUp);
const case2 = withApiProgress(case1, '/api/1.0/users');
const case3 = withApiProgress(case2, '/api/1.0/auth');

export default connect()(case3);