import React from 'react';
import { useState } from 'react';
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import { Field, ErrorMessage } from 'formik';

const formGroupClass= "form-group mb-6 mx-4 text-left relative"
const errorClass= "text-red-700 ml-2"
const labelClass = "mx-2 -text--color-secondary font-medium"
const inputClass = "form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-2 disabled:text-gray-400 focus:text-gray-700 focus:bg-white focus:-border--color-primary focus:outline-none"

const PasswordFC  = (props) => {
    const [hide, setHide] = useState(true)
    const handlePasswordDisplay=()=>{
        setHide(!hide)
    }
    const {label, name, ...rest}=props
    return ( 
        <div className={formGroupClass}>
            <label htmlFor={name} className={labelClass}>
                {label}
            </label>
            <Field id={name} name={name} type={hide?'password':'text'} {...rest} className={inputClass}></Field>
            <div className={errorClass}>
                <ErrorMessage name={name }></ErrorMessage>
            </div>
            <div className="absolute right-0 top-14 cursor-pointer" onClick={handlePasswordDisplay}>{hide?<AiFillEyeInvisible color='#d05e0d'/>:<AiFillEye color='#d05e0d'/>}</div>
        </div>
     );
}
 
export default PasswordFC;