import React, { Component, useEffect, useState } from 'react';
import logo from '../logo.png';
import {Link} from 'react-router-dom';
import { t, use } from "i18next";
//import {Authentication} from '../shared/AuthenticationContext';
import {connect, useDispatch, useSelector} from 'react-redux';
import {logoutSuccess} from '../redux/authActions';
import ProfileImage from './ProfileImage';

const TopBar = props => {

    const {isLoggedIn, username, name, surname, image} = useSelector((store) => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        name: store.name,
        surname: store.surname,
        image: store.image
    }));
    const [menuVisible, setMenuVisible] = useState(false);
    let dropdownClass = 'dropdown-menu';
    const dispatch = useDispatch();
    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    };

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
        menuVisible && (dropdownClass += ' show');
        navbarLinks = (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown p-0">
                    <button className="btn btn-light-outline border-0 d-flex" style={{cursor: 'pointer'}} onClick={() => setMenuVisible(!menuVisible)} >
                        <ProfileImage user={{username}} imagesrc={image} width='32' height='32' />
                        <span className="nav-link dropdown-toggle">{name + ' ' + surname}</span>
                    </button>
                    <div className={dropdownClass} onClick={() => setMenuVisible(!menuVisible)}>
                        <Link to={'/user/' + username} className='dropdown-item d-flex p-2'><i className='material-symbols-outlined me-2'>person</i> {t('Profile')}</Link>
                        <span className="dropdown-item d-flex p-2" onClick={onLogoutSuccess}><i className='material-symbols-outlined me-2'>logout</i> {t('Logout')}</span>
                    </div>
                </li>
            </ul>
        );
    }

    return (
        <div className='shadow-sm bg-light'>
            <nav className="navbar navbar-light container navbar-expand">
                <Link className='navbar-brand ms-2' to='/'>
                    <img src={logo} alt="Hoaxify Logo" width="55" />&nbsp;
                Hoaxify
                </Link>
                {navbarLinks}
            </nav>
        </div>
    );

  }

export default TopBar;