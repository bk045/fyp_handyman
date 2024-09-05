import React, {Component, useState, useContext} from 'react';
import * as Yup from 'yup'
import {Form, Formik} from 'formik'
import FormikControl from './forms/FormikControl';
import {toast} from 'react-toastify'
import { getErrorMessage } from '../../services/errorMessageService';
import * as authService from '../../services/authService'
import ModalControler from './modal/ModalControler';

const btnClass="inline-block px-6 py-2.5 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"
const inputClass = "form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-2 disabled:text-gray-400 focus:text-gray-700 focus:bg-white focus:-border--color-primary focus:outline-none"

const initialValues = {
    email:"",
}

const validationSchema=Yup.object({
    email:Yup.string().email().required().label('Registered email')
});



    const ForgotPasswordForm = () => {
    
        const [modalState, setModalState] = useState({
            visibility:false,
            modalType:"",
        });
        
        const fetchedData=(obj)=>{
            if (obj.response==='positive'){
                setModalState({visibility: false})
            }
        }
        
        const onSubmit=(values)=>{
            authService.sendResetPwdLink(values).then(function(response){
                console.log(response.data)
                setModalState({visibility:true,
                    modalType:'alert'})
            },function(error){
                console.log(error)
                toast.error(getErrorMessage(error)+ ' (Password Reset)')
            });
            console.log('Submit')
        }

    return (
        <div className="forgotpwd-body">
            <div className='shadow-myBoxShadow forgotpwd-form-container'>
                    <h3>Forgot Password</h3>
                    {/* <p>Please enter your registered email to receive link!!!</p> */}
                    <div className="form-wrapper">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {
                            formik=> {
                                    return <Form>
                                                <FormikControl className={inputClass} control='input' type='email' name='email' label='Registered email'/>
                                                <button type='submit' className={btnClass}>Send Link</button>
                                            </Form>
                            }
                        }
                    </Formik>
                    </div>
                    {(modalState.visibility&&modalState.modalType==='alert')?
                <ModalControler modalVisiblity={modalState.visibility} modalType='alert' title='Please check your inbox for the link!!!' sentData={fetchedData} redirectTo='/handyman/'/>:null}
            </div>
        </div>
    );
}
 
export default ForgotPasswordForm;