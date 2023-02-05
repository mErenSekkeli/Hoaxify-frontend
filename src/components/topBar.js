import React, { Component } from 'react';
import logo from '../logo.png';
import {Link} from 'react-router-dom';
import {withTranslation} from 'react-i18next';
//import {Authentication} from '../shared/AuthenticationContext';
import {connect} from 'react-redux';
import {logout} from '../redux/authActions';
class TopBar extends Component {
//  static contextType = Authentication;//just class types can be used as contextType

    /*onClickLogout = () => {
        this.props.dispatch(logout());
    }*/

   render() {
    const {t, isLoggedIn, username, onLogoutSuccess} = this.props;
    let navbarLinks = (
        <ul className="navbar-nav ms-auto">
        <li>
            <Link to='/login' className='nav-link'>{t('Login')}</Link>
        </li>
        <li>
            <Link to='/signup' className='nav-link'>{t('Sign Up')}</Link>
        </li>
    </ul>
    );
    if(isLoggedIn){
        navbarLinks = (
            <ul className="navbar-nav ms-auto">
                <li>
                    <Link to={'user/' + username} className='nav-link'>{t('Profile')}</Link>
                </li>
                <li>
                    <Link to='/login' onClick={onLogoutSuccess} className='nav-link'>
                    {t('Logout')}
                    </Link>
                </li>
            </ul>
        );
    }

    return (
        <div className='shadow-sm bg-light'>
            <nav className="navbar navbar-light container navbar-expand">
                <Link className='navbar-brand' to='/'>
                    <img src={logo}  alt="Hoaxify Logo" width="80" />&nbsp;
                Hoaxify
                </Link>
                {navbarLinks}
            </nav>
        </div>
    );

  }
}

const topBarWithTranslation = withTranslation()(TopBar);
const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.isLoggedIn,
        username: store.username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutSuccess: () => {
        return dispatch(logout());
        }
    };
};
        
export default connect(mapStateToProps, mapDispatchToProps)(topBarWithTranslation);