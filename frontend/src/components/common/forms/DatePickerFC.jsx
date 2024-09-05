import React from 'react';
import { Field, ErrorMessage } from 'formik';
import DateView from 'react-datepicker'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react';

const formGroupClass= "form-group mb-6 mx-4 text-left"
const errorClass= "text-red-700 ml-2"
const labelClass = "mx-2 -text--color-secondary font-medium mr-8   "
const inputClass = "form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-2 disabled:text-gray-400 focus:text-gray-700 focus:bg-white focus:-border--color-primary focus:outline-none"
// const inputClass="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
const DatePickerFC  = (props) => {
    const {label, name, ...rest}=props
    const [startDate, setStartDate] = useState(new Date());

    return ( 
        <div className={formGroupClass}>
            <label className={labelClass}>
                {label}
            </label>
            <Field name={name} {...rest}>
                {
                    (props)=>{
                        const {field, form, meta} = props
                        const {setFieldValue, setHours, setMinutes} = form
                        const {value} = field
                        
                        // const filterPassedTime = (time) => {
                        // const currentDate = new Date();
                        // const selectedDate = new Date(time);}
                        return (
                            <div>
                                <DatePicker id={name} {...field} {...rest}
                                showIcon
                                selected={value || startDate}
                                showTimeSelect
                                onChange={(val)=>{setFieldValue(name, val)}}
                                onBlur={field.onBlur}
                                className={inputClass}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                ></DatePicker>
                            </div>
                            
                        )
                    }
                }
            </Field>
            <div className={errorClass}>
                <ErrorMessage name={name}></ErrorMessage>
            </div>
        </div>
     );
}
 
export default DatePickerFC;