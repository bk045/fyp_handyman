import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../../services/contextService';
import * as authService from '../../services/authService';

const LogOut = () => {
    const {key, setKey, user, setUser} = useContext(UserContext)
    const redirectTo = useNavigate();
    authService.clearJwt();
    setKey({access:"", refresh:""});
    setUser({info:{}, profile:{}});
    redirectTo('/');
    return ( null );
}
 
export default LogOut;

