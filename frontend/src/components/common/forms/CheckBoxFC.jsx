import React from 'react';
import { Field, ErrorMessage } from 'formik';

const formGroupClass= "form-group mb-6 mx-4 text-left"
const errorClass= "text-red-700 ml-2"
const labelClass = "mx-2 -text--color-secondary font-medium mr-8   "
const inputClass = "form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-2 disabled:text-gray-400 focus:text-gray-700 focus:bg-white focus:-border--color-primary focus:outline-none"

const CheckBoxFC  = (props) => {
    const {label, name, options, ...rest}=props

    return ( 
        <div className={formGroupClass}>
            <label className={labelClass}>
                {label}
            </label>
            <Field name={name} {...rest} className={inputClass}>
                {
                    ({field})=>{
                        return options.map(
                            option=>{
                            return(
                                <React.Fragment key={option.key}>
                                            <input type='checkbox'
                                                    id={option.value}
                                                    className="mr-4 -accent--color-primary-l"
                                                    {...field}
                                                    value={option.value}
                                                    checked={field.value.includes(option.value) }
                                            />
                                            <label htmlFor={option.value} className="inline-block form-check-label -text--color-secondary cursor-pointer mr-10">{option.key}</label> 
                                </React.Fragment>
                            );
                        })
                    }
                }
            </Field>
            <div className={errorClass}>
                <ErrorMessage name={name }></ErrorMessage>
            </div>
        </div>
     );
}
 
export default CheckBoxFC;