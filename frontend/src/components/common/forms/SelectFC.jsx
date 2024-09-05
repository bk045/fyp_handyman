import React from 'react';
import { Field, ErrorMessage } from 'formik';

const formGroupClass= "form-group mb-6 mx-4 text-left"
const errorClass= "text-red-700 ml-2"

const SelectFC  = (props) => {
    const {label, name, options, placeholder, ...rest}=props

    return ( 
        <div className={formGroupClass}>
            <label htmlFor={name}>{label}</label>
            <Field as='select' id={name} name={name} placeholder={placeholder} {...rest}>
                {options.map(option=>{
                    return(
                        <option key={option.key} value={option.value}>{option.key}</option>
                    );
                })}
            </Field>
            <div className={errorClass}>
                <ErrorMessage name={name }></ErrorMessage>
            </div>
        </div>
     );
}
 
export default SelectFC;