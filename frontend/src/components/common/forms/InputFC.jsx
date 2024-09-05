import React from 'react';
import { Field, ErrorMessage } from 'formik';

const formGroupClass= "form-group mb-6 mx-4 text-left"
const errorClass= "text-red-700"

const InputFC  = (props) => {
    const {label, name, ...rest}=props

    return ( 
        <div className={formGroupClass}>
            <label htmlFor={name}>
                {label}
            </label>
            <div>
                <Field id={name} name={name} {...rest}></Field>
            </div>
            <div className={errorClass}>
                <ErrorMessage name={name }></ErrorMessage>
            </div>
        </div>
     );
}
 
export default InputFC;