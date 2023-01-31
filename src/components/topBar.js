import React, { Component } from 'react';
import logo from '../logo.png';
import {Link} from 'react-router-dom';
import {withTranslation} from 'react-i18next';

class TopBar extends Component {
  render() {
    const {t} = this.props;
    return (
        <div className='shadow-sm bg-light'>
            <nav className="navbar navbar-light container navbar-expand">
                <Link className='navbar-brand' to='/'>
                    <img src={logo}  alt="Hoaxify Logo" width="80" />&nbsp;
                Hoaxify
                </Link>
                <ul className="navbar-nav ms-auto">
                    <li>
                        <Link to='/login' className='nav-link'>{t('Login')}</Link>
                    </li>
                    <li>
                        <Link to='/signup' className='nav-link'>{t('Sign Up')}</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
  }
}
export default withTranslation()(TopBar);