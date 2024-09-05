import React, { useState, useContext } from 'react';
import {Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import { getErrorMessage } from '../../services/errorMessageService';
import { mapBusinessUserData } from '../../services/mapService';
import FormikControl from '../common/forms/FormikControl';
import ModalControler from '../common/modal/ModalControler';
import * as userService from '../../services/authService'
import { cityOptions, provinceOptions, businessTypeOptions } from '../../db/formData';
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from "../../services/contextService";
import App from '../../App';




const btnClass="inline-block px-6 py-2.5 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"
const inputClass = "form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-2 disabled:text-gray-400 focus:text-gray-700 focus:bg-white focus:-border--color-primary focus:outline-none"

const userTypeOptions = [
    {key:'Customer', value:'b-customer'},
    {key:'Service Provider', value:'b-caterer'},
]

const BusinessRegistrationFormFC = () => {
    const [modalState, setModalState] = useState({
        visibility:false,
        modalType:"",
    });

    const {businessList} = useContext(AppContext);
    // console.log(businessList);
    
    // useEffect(()=>{
    //     requestService.getServiceProviderServices(location.state.caterer_id).then(response =>{
    //         const {data} = response;
    //         setCatererServices(data)
    //     });
    // },[])

    const fetchedData=(obj)=>{
        if (obj.response==='positive'){
            setModalState({visibility: false})
        }
    }
    
    const initialValues = {
        name_of_business:"", 
        type_of_business:"", 
        person_to_contact:"", 
        person_phone:"", 
        email:"", 
        password:"",
        cpassword:"",
        province:"", 
        city:"", 
        area:"",
        user_type:"",
    }
    const validationSchema = Yup.object({
        // id:"",
        name_of_business:Yup.string().required().label('Name of business'),
        type_of_business:Yup.string().required().label('Type of business'), 
        person_to_contact:Yup.string().required().label('Name of contact person'), 
        person_phone:Yup.string().required().label('Contact person phone'),
        email:Yup.string().email().required().label('Email'),  
        password:Yup.string().required().label('Password'),
        cpassword:Yup.string().required().oneOf([Yup.ref('password'), null]).label('Confirm Password'),
        province:Yup.string().required().label('Province'),
        city:Yup.string().required().label('City'), 
        area:Yup.string().required().label('Area'),
        user_type:Yup.string().required().label('What are you?'),  
    })
   
    const onSubmit = async (values, propsOnSubmit) =>{
        const userData = mapBusinessUserData(values);
        let newUserId
        await userService.registerUser(userData.user).then(function (response) {
            newUserId = response.data.id;
            userService.registerProfile(newUserId, userData.profile).then(function (response) {
                setModalState({visibility:true,
                    modalType:'alert'})
                propsOnSubmit.resetForm();
            }, function(error){
                userService.unregisterUser(newUserId)
                toast.error(getErrorMessage(error)+ ' (Profile Creation)')
            });
        }, function(error){
            console.log(error)
            toast.error(getErrorMessage(error)+ ' (User Creation)')
        });
    }

    return (
        <div className='shadow-myBoxShadow reg-container form-wrapper outlet-container'>
            <div className="form-container">
                <h2>Business Registration Form</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {
                        formik=> {
                                return <Form>
                                            <FormikControl className={inputClass} control='input' type='text' name='name_of_business' label='Name of business'/>
                                            <FormikControl className={inputClass} control='select' name='type_of_business' label='Business types' options={businessTypeOptions}/>
                                            <FormikControl className={inputClass} control='input' type='text' name='person_to_contact' label='Person to contact'/>
                                            <FormikControl className={inputClass} control='input' type='text' name='person_phone' label='Contact person phone'/>
                                            <FormikControl className={inputClass} control='input' type='email' name='email' label='Email'/>
                                            {/* Displays both password and confirm password with name as 'password' and 'cpassword' */}
                                            <FormikControl className={inputClass} control='passwordCombo'/>
                                            <FormikControl className={inputClass} control='select' name='province' label='Province' options={provinceOptions}/>
                                            <FormikControl className={inputClass} control='select' name='city' label='City' options={cityOptions}/>
                                            <FormikControl className={inputClass} control='textarea' name='area' label='Area'/>
                                            <FormikControl control='radio' name='user_type' label='What are you?' options={userTypeOptions}/>
                                            
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
 
export default BusinessRegistrationFormFC;