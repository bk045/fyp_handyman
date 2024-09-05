import React, { useState } from 'react';
import {Form, Formik, ErrorMessage} from 'formik'
import {toast} from 'react-toastify'
import { getErrorMessage } from '../../services/errorMessageService';
import { mapIndividualUserData } from '../../services/mapService';
import FormikControl from '../common/forms/FormikControl';
import * as Yup from 'yup'
import ModalControler from '../common/modal/ModalControler';
import 'react-toastify/dist/ReactToastify.css'
import * as authService from '../../services/authService'
import { cityOptions, genderOptions, provinceOptions } from '../../db/formData';
import { useRef } from 'react';
import PreviewImage from './PreviewImage';
import { useEffect } from 'react';



const btnClass="inline-block px-6 py-2.5 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"
const inputClass = "form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-2 disabled:text-gray-400 focus:text-gray-700 focus:bg-white focus:-border--color-primary focus:outline-none"

const userTypeOptions = [
    {key:'Customer', value:'i-customer'},
    {key:'Service Provider', value:'i-caterer'},
]
const ImageUpload
= () => {
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]
    const imageRef = useRef(null);
    const initialValues = {
        first_name:"Bhishan",
        image:null,
    }

    useEffect (()=>{

    },[])

    const validationSchema = Yup.object({
        first_name:Yup.string().required().label('First Name'),
        image:Yup.mixed().nullable().required().test(
            "FILE_SIZE",
            "Uploaded file is too big!!!",
            (value) => !value || (value && value.size <= 1024 * 1024)
        ).test(
            'FILE_FORMAT',
            "Uploaded file is not supported!!!",
            (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
        ),
        // // middle_name:Yup.string().required().nullable().label('Middle Name'), 
        // last_name:Yup.string().required().label('Last Name'), 
        // email:Yup.string().email().required().label('Email'), 
        // mobile:Yup.string().required().label('Mobile'), 
        // gender:Yup.string().required().label('Gender'), 
        // password:Yup.string().required().label('Password'),
        // cpassword:Yup.string().required().oneOf([Yup.ref('password'), null]).label('Confirm Password'),
        // province:Yup.string().required().label('Province'),
        // city:Yup.string().required().label('City'), 
        // area:Yup.string().required().label('Area'),
        // user_type:Yup.string().required().label('User type'),
    })
    // const handleUpload
    const onSubmit = (values, propsOnSubmit) =>{
        console.log(values)
        // const userData = mapIndividualUserData(values);
        // let newUserId
        // authService.registerUser(userData.user).then(function (response) {
        //     newUserId = response.data.id;
        //     console.log(newUserId)
        //     authService.registerProfile(newUserId, userData.profile).then(function (response) {
        //         setModalState({visibility:true,
        //             modalType:'alert'})
        //         propsOnSubmit.resetForm();
        //     }, function(error){
        //         authService.unregisterUser(newUserId)
        //         toast.error(getErrorMessage(error)+ ' (Profile Creation)')
        //     });
        // }, function(error){
        //     toast.error(getErrorMessage(error)+ ' (User Creation)')
        // });
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
                            console.log("Errors", formik.errors)
                                return <Form>
                                        <input ref={imageRef} hidden type='file' name='image' label='Document Photo' onChange={(e)=>formik.setFieldValue('image', e.target.files[0])}/>
                                        {formik.values.image && <PreviewImage file={formik.values.image}/>}
                                        <ErrorMessage name='image'/>
                                            <button type='submit' className={btnClass} onClick={()=>{imageRef.current.click()}}>Upload</button>
                                        </Form>
                        }
                    }
                </Formik>
            </div>
            
        </div>
    );
}
 
export default ImageUpload
;