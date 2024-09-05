import React, { useEffect, useState } from 'react';
import InputField from './InputField';

const PasswordUpdateComponent = ({passedValues, sentValues}) => {
    const [values, setValues] = useState({
        password:"",
        cpassword:"",
        errors:{}
    });
    //On Mount
    useEffect(()=>{
        console.log(sentValues)
        setValues({...values, 'password':sentValues['password']})
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
                name={'password'}
                label = {"Password"}
                value = {values['password']}
                type = {'text'}
                onChange = {handleChange}
            ></InputField>
            <InputField 
                name={'cpassword'}
                label = {"Confirm Password"}
                value = {values['cpassword']}
                type = {'text'}
                onChange = {handleChange}
            ></InputField>
        </div>
     );
}
 
export default PasswordUpdateComponent;