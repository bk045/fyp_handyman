import React, { useEffect, useState } from 'react';
import InputField from './InputField';

const AddressUpdateComponent = ({passedValues, sentValues}) => {
    const [values, setValues] = useState({
        province:"",
        city:"",
        area:"",
        errors:{}
    });
    //On Mount
    useEffect(()=>{
        // console.log(sentValues)
        setValues({...values, 'province':sentValues['province'],
                            'city':sentValues['city'],
                            'area':sentValues['area']})
    },[])
    //On Update
    useEffect(()=>{
        passedValues(values)
    },[values]);

    const handleChange=(e)=>{
        e.preventDefault();
        setValues({...values, [e.target.name]: e.target.value});
    }
    return ( 
        <div>
            <InputField 
                name={'province'}
                label = {"Province"}
                value = {values['province']}
                type = {'text'}
                onChange = {handleChange}
            ></InputField>
            <InputField 
                name={'city'}
                label = {"City"}
                value = {values['city']}
                type = {'text'}
                onChange = {handleChange}
            ></InputField>
            <InputField 
                name={'area'}
                label = {"Area"}
                value = {values['area']}
                type = {'text'}
                onChange = {handleChange}
            ></InputField>
        </div>
     );
}
 
export default AddressUpdateComponent;