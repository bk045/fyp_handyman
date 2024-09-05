import React, { useEffect, useState } from 'react';
import InputField from './InputField';

const MobileUpdateComponent = ({passedValues, sentValues}) => {
    const [values, setValues] = useState({
        mobile:"",
        errors:{}
    });
    //On Mount
    useEffect(()=>{
        console.log(sentValues)
        setValues({...values, 'mobile':sentValues['mobile']})
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
                name={'mobile'}
                label = {"Mobile Number"}
                value = {values['mobile']}
                type = {'text'}
                onChange = {handleChange}
            ></InputField>
        </div>
     );
}
 
export default MobileUpdateComponent;