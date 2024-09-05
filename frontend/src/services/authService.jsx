// import {useContext} from 'react';
import http from './httpService'
import https from './httpsService'
import config from '../config.json'
// import { UserContext } from '../../../services/contextService';

// const {key, setKey, user, setUser} = useContext(UserContext)

export function registerUser (user){
    return http.post(config.authAPI, user)    
}

export function unregisterUser (id){
    return http.delete(config.userAPI + id + "/")    
}

export function getUser (id){
    return http.get(config.userAPI + id + "/")    
}
export function checkUserStatus (email){
    console.log(email);
    return http.post(config.userStatusAPI, email)    
}
export function deleteUser (id){
    return https.delete(config.userAPI + id + "/")
}
export function blockUser (id){
    return https.patch(config.userAPI + id + "/block/")
}
export function activateUser (id){
    return https.patch(config.userAPI + id + "/activate/")    
}
export function suspendUser (id){
    return https.patch(config.userAPI + id + "/suspend/")    
}
export function recoverUser (id){
    return https.patch(config.userAPI + id + "/recover/")    
}

export function getMiniUserProfile (user_id){
    return http.get(config.userAPI + user_id + "/profile/")
}

export function getDetailedUserProfile (user_id){
    return https.get(config.userAPI + user_id + "/detail_profile/")
}
export function loginUser (user){
    return http.post(config.loginUserAPI, user)    
}
export function registerProfile (id, profile){
    return http.post((config.userAPI +`${id}/profile/create_profile/`), profile)
}

export function updateProfile(id, profile){
    return https.patch(config.userAPI +id+"/profile/patch_profile/", profile, {headers:{"Content-Type":'multipart/form-data'}})
}
// --------------------------------------------------------------------

export function sendResetPwdLink(email){
    return http.post(config.authAPI +'reset_password/', email)
}

export function setJwt(jwt){
    localStorage.setItem("refresh", jwt.refresh)
    localStorage.setItem("access", jwt.access);
}

export function getJwt(){
    return {refresh:localStorage.getItem('refresh'), access:localStorage.getItem('access')}
}
export function clearJwt(){
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
}