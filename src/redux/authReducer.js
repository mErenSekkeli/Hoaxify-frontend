import * as ACTIONS from './Constants';

const defaultState = {
    isLoggedIn: false,
    username: null,
    name: null,
    surname: null,
    image: null,
    password: null
  };
  
  const authReducer = (state = {...defaultState}, action) => {
    if(action.type === ACTIONS.LOGOUT_SUCCESS){
      return defaultState;
    }
    if(action.type === ACTIONS.LOGIN_SUCCESS){
      return {
      ...action.payload
      };
    }
    if(action.type === ACTIONS.UPDATE_SUCCESS){
      return {
        ...state,
        ...action.payload
      }
    }
    return state;
  }

  export default authReducer;