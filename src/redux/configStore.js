import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authReducer.js';
import SecureLS from 'secure-ls';
import CryptoJS from 'crypto-js';
import thunk from 'redux-thunk';
import { setAuthorizationHeader } from '../api/apiCalls.js';

const ls = new SecureLS({encodingType: 'aes'});
const key = CryptoJS.SHA256('user-auth').toString();//Normally this key should get from server side

const getStateFromStorage = () => {
    const userAuthData = ls.get(key);
    let loggedInState = {
        isLoggedIn: false,
        username: null,
        name: null,
        surname: null,
        image: null,
        password: null
    };

    if(userAuthData){
        try{
            loggedInState = userAuthData;
        }catch(e){
            alert('Data Manipulation Detected');
        }
    }
    return loggedInState;
}

const updateStateInStorage = (state) => {
    ls.set(key, state);
}

  
const configStore = () => {
    const loggedInState = getStateFromStorage();
    setAuthorizationHeader(loggedInState);
    const store = configureStore({
        reducer: authReducer,
        preloadedState: loggedInState,
        middleware: [thunk]
    });

    store.subscribe(() => {
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    });

    return store;
}

export default configStore;