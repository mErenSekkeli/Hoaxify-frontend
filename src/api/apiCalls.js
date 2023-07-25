import axios from "axios";

export const signup = (body) =>{
   return axios.post('/api/1.0/users', body);
}

export const login = (body) =>{
   return axios.post('/api/1.0/auth', {}, {auth: body});
}

export const changeLanguage = language => {
   axios.defaults.headers['accept-language'] = language;
}

export const getUserByUsername = (username) => {
   return axios.post(`/api/1.0/getUserByUserName?username=${username}`);
}

export const getAllUsers = (page = 0, size = 5) => {
   return axios.get('/api/1.0/usersList?page=' + page + '&size=' + size);
}

export const setAuthorizationHeader = ({username, password, isLoggedIn}) => {
   if(isLoggedIn){
      const authorizationHeaderValue = `Basic ${window.btoa(username + ':' + password)}`;
      axios.defaults.headers['Authorization'] = authorizationHeaderValue;
   }else {
      delete axios.defaults.headers['Authorization'];
   }
}

export const getUser = (username) => {
   return axios.get(`/api/1.0/users/${username}`);
}

export const updateUser = (username, body) => {
   return axios.put(`/api/1.0/users/${username}`, body);
}