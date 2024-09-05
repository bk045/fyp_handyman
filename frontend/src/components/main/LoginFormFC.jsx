import React, {useContext, useState} from 'react';
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import FormikControl from '../common/forms/FormikControl';
import * as authService from '../../services/authService'
import { UserContext } from '../../services/contextService';
import ModalControler from '../common/modal/ModalControler';
import { getErrorMessage } from '../../services/errorMessageService';

const btnClass="inline-block px-6 py-2.5 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"
// 
// ""
const inputClass = "form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-2 disabled:text-gray-400 focus:text-gray-700 focus:bg-white focus:-border--color-primary focus:outline-none"

const LoginFormFC = () => {

    // To redirect to a specific route
    const redirectTo = useNavigate();
    // Using User context
    const {key, setKey, user, setUser} = useContext(UserContext)


    const handleForgotPassword= ()=>{
        console.log('handleForgotPassword')
        redirectTo('/forgot_password')
    }

    const handleSignUp= ()=>{
        console.log('handleSignUp')
        redirectTo('/handyman/register')
    }

    const initialValues = {
        email:'',
        password:'',
    }
    const validationSchema = Yup.object({
        email: Yup.string().email().required().label('Email'),
        password: Yup.string().required().label('Password'),
    })
    const onSubmit = (values) =>{
        try{
            // console.log(values.email)
            authService.checkUserStatus({email:values.email}).then(async function (response){
                const {data} = response;
                if (data === 'No User'){
                    toast.error('User does not exists!!!')
                }
                else if (data === 'Deleted'){
                    toast.error('User already deleted!!!')
                }
                else{
                    try{
                        const {data:jwt} = await authService.loginUser(values)
                        console.log('Data From Login', data)
                        authService.setJwt(jwt);
                        let user_id = (jwtDecode(jwt.access).user_id);
                        const {data:userInfo} = await authService.getUser(user_id)
                        const {data:user_profile} = await authService.getMiniUserProfile(user_id)
                        setKey({...key, 'refresh':jwt.refresh, 'access':jwt.access})
                        setUser({...user, 'profile':user_profile[0], 'info':userInfo})
                        console.log(userInfo)
                        redirectTo('/handyman/services/');
                    }catch (error){
                        if (error.response && error.response.status === 401){
                            toast.error("Email or password incorrect.")
                        }
                    }
                }
            }, function(error){
                let er = getErrorMessage(error);
                toast.error(er)
            });
        }
        catch (error){
            let er = getErrorMessage(error);
                toast.error(er)
        }
    }
    
    return (
            <div className='form-wrapper login-container shadow-myBoxShadow outlet-container'>
                <img src="/images/logo.png" alt="" className='login-logo'/>
                <div className="form-container">
                    <h2>Login Form</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        validateOnMount
                    >
                        {
                            formik=> {
                                    return <Form>
                                                <FormikControl
                                                className={inputClass}
                                                control='input'
                                                type='email'
                                                name='email'
                                                label='Email'
                                                >
                                                </FormikControl>
                                                <FormikControl
                                                control='password'
                                                name='password'
                                                label='Password'
                                                >
                                                </FormikControl>
                                                <div className='link-group'>
                                                    <div onClick={handleForgotPassword}>Forgot password?</div>
                                                    <div onClick={handleSignUp}> Not a memeber?</div>
                                                </div>
                                                <button type='submit' className={btnClass} disabled={!formik.isValid}>Login</button>
                                            </Form>
                            }
                        }
                    </Formik>
                </div>
            </div>
    );
}
 
export default LoginFormFC;