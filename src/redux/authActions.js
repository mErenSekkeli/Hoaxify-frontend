import * as ACTIONS from './Constants';
import {login, signup} from '../api/apiCalls';

export const logout = () => {
    return {
        type: ACTIONS.LOGOUT_SUCCESS
    };
};

export const loginSuccess = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    };
};

export const loginHandler = (credentials) => {
    return async function(dispatch) {
        console.log(credentials);
    const response = await login(credentials);
    const authState = {
        isLoggedIn: true,
        username: credentials.userName,
        ...response.data.user,
        token: response.data.token
    };
    dispatch(loginSuccess(authState));
    return response;
    };
};

export const signupHandler = (user) => {
    return async function(dispatch) {
    const response = await signup(user);
    const auth = {
        username: user.userName,
        password: user.pass
    };
    await dispatch(loginHandler(auth));
    return response;
    };
};

export const updateSuccess = ({name, surname, image}) => {

    return {
        type: ACTIONS.UPDATE_SUCCESS,
        payload: {
            name,
            surname,
            image
        }
    };
};