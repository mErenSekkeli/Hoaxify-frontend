import React from "react";
import {signup, changeLanguage} from  "../api/apiCalls";
import Input from "../components/Input";
import {withTranslation} from "react-i18next";

class UserSignUp extends React.Component{
//bu class component. bir de functional component var app.js gibi

    state = {
        name:null,
        surname:null,
        userName: null,
        pass:null,
        pass2:null,
        pendingApiCall: false,
        errors : {}
    }

/*  onChangeName = event => {
        this.setState({
            name:event.target.value
        });
    }

    onChangeSurname = event => {
        this.setState({
            surname:event.target.value
        });
    }

    onChangeUserName = event => {
        //değişimin gerçekleştiğini react'a söylüyor
        this.setState({
            userName: event.target.value
        })
    };

    onChangePass = event => {
        this.setState({
            pass: event.target.value
        })
    };

    onChangePass2 = event => {
        this.setState({
            pass2: event.target.value
        })
    };
*/
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
        //eğer değişken ismiyle body'deki isim aynı ise direkt olarak yazabiliriz
        const body = {
            name,
            surname,
            userName,
            pass,
            pass2
        };
        
        this.setState({pendingApiCall: true});
        //package.json dosyasında proxy ayarı yaptığımız için domaini yazmamıza gerek yok
        try{
            const response = await signup(body);
            //Başarılı kısmı
        }catch(error){
            if(error.response.data.validationErrors)
                this.setState({errors: error.response.data.validationErrors});
        }

        this.setState({pendingApiCall:false});

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
        const {pendingApiCall, errors} = this.state;
        const {name, surname, userName, pass, pass2} = errors;
        const {t} = this.props;
        return(
            <div className="container">
            <div className="row">
            <div className="col-md-4 border border-2 rounded-4 my-4">
            <form>
                <h1 className="text-center">{t('Sign Up')}</h1>
                <Input name="name" label={t('Name')} error={name} onChange={this.onChange} />
                <Input name="surname" label={t('Surname')} error={surname} onChange={this.onChange} />
                <Input name="userName" label={t('User Name')} error={userName} onChange={this.onChange} />
                <Input name="pass" label={t('Password')} error={pass} onChange={this.onChange} type="password" />
                <Input name="pass2" label={t('Password Again')} error={pass2} onChange={this.onChange} type="password" />
                <div className="text-center">
                    <button
                    name="signUpBtn"
                    className="btn btn-primary my-3"
                    onClick={this.onClickSignUp}
                    disabled={pendingApiCall || pass2 !== undefined}>
                        {(pendingApiCall) && <span className="spinner-grow spinner-grow-sm"></span>}
                        {(!pendingApiCall) ? t('Sign Up') : t('Redirecting')}</button>
                </div>
            </form>
            </div>
            <div>
            <img src="https://flagcdn.com/h20/us.png" alt="United States" onClick={() => this.onChangeLanguage('en')} style={{cursor:'pointer'}}></img>
            &nbsp;
            <img src="https://flagcdn.com/h20/tr.png" alt="turkish" onClick={() => this.onChangeLanguage('tr')} style={{cursor:'pointer'}}></img>
            </div>
            </div>
            </div>
        );
    }
}

export default withTranslation()(UserSignUp);