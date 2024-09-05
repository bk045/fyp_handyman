import React from 'react';
import { useState } from 'react';
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import { Field, ErrorMessage } from 'formik';

const formGroupClass= "form-group mb-6 mx-4 text-left relative"
const errorClass= "text-red-700 ml-2"
const labelClass = "mx-2 -text--color-secondary font-medium"
const inputClass = "form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-2 disabled:text-gray-400 focus:text-gray-700 focus:bg-white focus:-border--color-primary focus:outline-none"

const PasswordComboFC  = (props) => {
    const [hide, setHide] = useState(true)
    const handlePasswordDisplay=()=>{
        setHide(!hide)
    }
    const {...rest}=props
    return ( 
        <div>
            <div className={formGroupClass}>
                <label htmlFor='password' className={labelClass}>
                    Password
                </label>
                <Field id='password' name='password' type={hide?'password':'text'} {...rest} className={inputClass}></Field>
                <div className={errorClass}>
                    <ErrorMessage name='password'></ErrorMessage>
                </div>
                <div className="absolute right-0 top-14 cursor-pointer" onClick={handlePasswordDisplay}>{hide?<AiFillEyeInvisible color='#d05e0d'/>:<AiFillEye color='#d05e0d'/>}</div>
            </div>
            <div className={formGroupClass}>
                <label htmlFor='cpassword' className={labelClass}>
                    Confirm Password
                </label>
                <Field id='cpassword' name='cpassword' type={hide?'password':'text'} {...rest} className={inputClass}></Field>
                <div className={errorClass}>
                    <ErrorMessage name='cpassword'></ErrorMessage>
                </div>
                <div className="absolute right-0 top-14 cursor-pointer" onClick={handlePasswordDisplay}>{hide?<AiFillEyeInvisible color='#d05e0d'/>:<AiFillEye color='#d05e0d'/>}</div>
            </div>
        </div>
     );
}
 
export default PasswordComboFC;