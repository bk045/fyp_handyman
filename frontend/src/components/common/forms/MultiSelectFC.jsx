import React from 'react';
import { Field, ErrorMessage } from 'formik';
// import CustomMultiSelect from './MultiSelect';
import MultiSelect from './MultiSelect';
import Select from 'react-dropdown-select'
// import { defaultAriaLiveMessages } from 'react-select/dist/declarations/src/accessibility';


const formGroupClass= "form-group mb-6 mx-4 text-left"
const errorClass= "text-red-700 ml-2"




const MultiSelectFC  = (props) => {
    const {label, name, options, multi, placeholder, ...rest}=props
    
   
    return ( 
        <div className={formGroupClass}>
            <label htmlFor={name}>{label}</label>
            <Field name={name} {...rest}>
                {props=>{
                    const {field, form, meta} = props
                    // console.log('Render Props', props)
                    return(
                        <div>
                            <MultiSelect
                                field = {field}
                                form = {form}
                                options = {options}
                                isMulti = {true}
                                placeholder = {placeholder}
                            >

                            </MultiSelect>
                            {/* <input type='text' id={field.name} {...field}/> */}

                            {/* <select id={field.name} multiple>
                                {cityOptions.map(option=>(<option key={option.value} value={option.value}>{option.label}</option>))}
                            </select> */}
                            {/* </input> */}
                            {/* <Select options={cityOptions}
                                    id={field.name}
                                    multi={multi}
                                    searchable='true'
                                    onChange={value=>field.onChange(value)}
                                    {...field}
                                /> */}
                            {/* {meta.error && meta.touched ? <div>{meta.error}</div>:null} */}
                        </div>
                        )
                }}
            </Field>
            <div className={errorClass}>
                <ErrorMessage name="city"></ErrorMessage>
            </div>
        </div>
     );
}
 
export default MultiSelectFC;