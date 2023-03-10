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