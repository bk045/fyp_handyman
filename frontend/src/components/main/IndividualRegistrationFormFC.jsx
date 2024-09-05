import React, { useState } from 'react';
import {Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import { getErrorMessage } from '../../services/errorMessageService';
import { mapIndividualUserData } from '../../services/mapService';
import FormikControl from '../common/forms/FormikControl';
import * as Yup from 'yup'
import ModalControler from '../common/modal/ModalControler';
import 'react-toastify/dist/ReactToastify.css'
import * as authService from '../../services/authService'
import { cityOptions, genderOptions, provinceOptions } from '../../db/formData';



const btnClass="inline-block px-6 py-2.5 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"
const inputClass = "form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-2 disabled:text-gray-400 focus:text-gray-700 focus:bg-white focus:-border--color-primary focus:outline-none"

const userTypeOptions = [
    {key:'Customer', value:'i-customer'},
    {key:'Service Provider', value:'i-caterer'},
]

const IndividualRegistrationFormFC = () => {
    const [modalState, setModalState] = useState({
        visibility:false,
        modalType:"",
    });
    
    const fetchedData=(obj)=>{
        if (obj.response==='positive'){
            setModalState({visibility: false})
        }
    }
    
    const initialValues = {
        first_name:"", 
        middle_name:"", 
        last_name:"",
        email:"", 
        mobile:"",
        gender:"",
        password:"",
        cpassword:"", 
        province:"", 
        city:"", 
        area:"",
        user_type:""
    }
    const validationSchema = Yup.object({
        first_name:Yup.string().required().label('First Name'),
        // middle_name:Yup.string().required().nullable().label('Middle Name'), 
        last_name:Yup.string().required().label('Last Name'), 
        email:Yup.string().email().required().label('Email'), 
        mobile:Yup.string().required().label('Mobile'), 
        gender:Yup.string().required().label('Gender'), 
        password:Yup.string().required().label('Password'),
        cpassword:Yup.string().required().oneOf([Yup.ref('password'), null]).label('Confirm Password'),
        province:Yup.string().required().label('Province'),
        city:Yup.string().required().label('City'), 
        area:Yup.string().required().label('Area'),
        user_type:Yup.string().required().label('User type'),
    })
   
    const onSubmit = (values, propsOnSubmit) =>{
        const userData = mapIndividualUserData(values);
        console.log(userData)
        let newUserId
        authService.registerUser(userData.user).then(function (response) {
            newUserId = response.data.id;
            console.log(newUserId)
            authService.registerProfile(newUserId, userData.profile).then(function (response) {
                setModalState({visibility:true,
                    modalType:'alert'})
                propsOnSubmit.resetForm();
            }, function(error){
                authService.unregisterUser(newUserId)
                toast.error(getErrorMessage(error)+ ' (Profile Creation)')
            });
        }, function(error){
            toast.error(getErrorMessage(error)+ ' (User Creation)')
        });
    }

    return (
        <div className='shadow-myBoxShadow reg-container form-wrapper outlet-container'>
            <div className="form-container">
                <h2>Individual Registration Form</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {
                        formik=> {
                                return <Form>
                                            <FormikControl className={inputClass} control='input' type='text' name='first_name' label='First Name'/>
                                            <FormikControl className={inputClass} control='input' type='text' name='middle_name' label='Middle Name'/>
                                            <FormikControl className={inputClass} control='input' type='text' name='last_name' label='Last Name'/>
                                            <FormikControl className={inputClass} control='input' type='email' name='email' label='Email'/>
                                            <FormikControl className={inputClass} control='input' type='text' name='mobile' label='Mobile'/>
                                            <FormikControl className={inputClass} control='radio' name='gender' label='Gender' options={genderOptions}/>
                                            {/* Displays both password and confirm password with name as 'password' and 'cpassword' */}
                                            <FormikControl className={inputClass} control='passwordCombo'/>
                                            <FormikControl className={inputClass} control='select' name='province' label='Province' options={provinceOptions}/>
                                            <FormikControl className={inputClass} control='select' name='city' label='City' options={cityOptions}/>
                                            <FormikControl className={inputClass} control='textarea' name='area' label='Area'/>
                                            {/* <FormikControl control='input' type='text' name='house_no' label='House No'/> */}
                                            <FormikControl control='radio' name='user_type' label='Who are you?' options={userTypeOptions}/>
                
                                            <button type='submit' className={btnClass} disabled={!formik.isValid}>Register</button>
                                        </Form>
                        }
                    }
                </Formik>
            </div>
            {(modalState.visibility&&modalState.modalType==='alert')?
                <ModalControler modalVisiblity={modalState.visibility} modalType='alert' title='Registration Successful!!! Check your inbox for activation link!!!' sentData={fetchedData} redirectTo='/handyman/login'/>:null}
            
        </div>
    );
}
 
export default IndividualRegistrationFormFC;