import React from 'react';
import { Field, ErrorMessage } from 'formik';

const formGroupClass= "form-group mb-6 mx-4 text-left"
const errorClass= "text-red-700"
// const labelClass = "mx-2 -text--color-secondary font-medium"
// const inputClass = "form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-2 disabled:text-gray-400 focus:text-gray-700 focus:bg-white focus:-border--color-primary focus:outline-none"

const TextAreaFC  = (props) => {
    const {label, name, ...rest}=props

    return ( 
        <div className={formGroupClass}>
            <label htmlFor={name}>
                {label}
            </label>
            <Field as='textarea' id={name} name={name} {...rest}></Field>
            <div className={errorClass}>
                <ErrorMessage name={name }></ErrorMessage>
            </div>
        </div>
     );
}
 
export default TextAreaFC;