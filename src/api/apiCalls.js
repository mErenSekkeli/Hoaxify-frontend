import axios from "axios";

export const signup = (body) =>{
   return axios.post('/api/1.0/users', body);
}

export const login = (body) =>{
   return axios.post('/api/1.0/auth', body);
}

export const logout = () =>{
   return axios.post('/api/1.0/logout');
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

export const setAuthorizationHeader = ({isLoggedIn, token}) => {
   if(isLoggedIn){
      const authorizationHeaderValue = `Bearer ${token}`;
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

export const postHoax = (username, hoax) => {
   return axios.post(`/api/1.0/hoaxes/${username}`, hoax);
}

export const getHoaxes = (userFromUserPage = null, page = 0, size = 5) => {
   const path = (userFromUserPage !== null) ? `/api/1.0/users/${userFromUserPage.userName}/hoaxes?page=${page}&size=${size}` :
   `/api/1.0/hoaxes?page=${page}&size=${size}`;
   //?sort=id,desc --> sort by id descending
   return axios.get(path);
}

export const getOldHoaxes = (id, userFromUserPage = null, page = 0, size = 5) => {
   const path = (userFromUserPage !== null) ? `/api/1.0/users/${userFromUserPage.userName}/hoaxes/${id}?direction=before&page=${page}&size=${size}` :
   `/api/1.0/hoaxes/${id}?direction=before&page=${page}&size=${size}`;
   return axios.get(path);
}

export const getNewHoaxesCount = (id, userFromUserPage = null) => {
   const path = (userFromUserPage !== null) ? `/api/1.0/users/${userFromUserPage.userName}/hoaxes/${id}?count=true` :
   `/api/1.0/hoaxes/${id}?count=true`;
   return axios.get(path);
}

export const getNewHoaxes = (id, userFromUserPage = null) => {
   const path = (userFromUserPage !== null) ? `/api/1.0/users/${userFromUserPage.userName}/hoaxes/${id}?direction=after` :
   `/api/1.0/hoaxes/${id}?direction=after`;
   return axios.get(path);
}

export const postHoaxAttachment = (username, hoaxAttachement) => {
   return axios.post(`/api/1.0/hoax-attachments/${username}`, hoaxAttachement);
}

export const cancelHoaxAttachment = (username, file) => {
   return axios.delete(`/api/1.0/hoax-attachments/${username}`, { data: file });
}

export const deleteHoax = (id) => {
   return axios.delete(`/api/1.0/hoaxes/${id}`);
}

export const deleteUser = (username) => {
   return axios.delete(`/api/1.0/users/${username}`);
}

export const likeHoax = (id, body) => {
   return axios.post(`/api/1.0/hoaxes/likes/${id}`, body);
}

export const unlikeHoax = (id, username) => {
   return axios.delete(`/api/1.0/hoaxes/likes/${id}/${username}`);
}

export const getUsersLikes = (username) => {
   return axios.get(`/api/1.0/users/${username}/likes`);
}