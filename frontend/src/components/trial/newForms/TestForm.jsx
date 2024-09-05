import React, { useState } from 'react';
import InputComponent from './comps/Input';
const TestForm = () => {
    const [values, setValues] = useState({
        username:"",
        email:"",
        password:"",
        cpassword:"",
        male:"",
        female:"",
    });
 
    const inputs = [
        {
            id:1,
            name:'username',
            type:'text',
            placeholder:'User Name',
            label:'User Name'
        },
        {
            id:2,
            name:'email',
            type:'text',
            placeholder:'Email',
            label:'Email'
        },
        {
            id:3,
            name:'birthday',
            type:'text',
            placeholder:'Birthday',
            label:'Birthday'
        },
        {
            id:4,
            name:'password',
            type:'password',
            placeholder:'Password',
            label:'Password'
        },
        {
            id:5,
            name:'cpassword',
            type:'password',
            placeholder:'Confirm Password',
            label:'Confirm Password'
        },
    ]
    // Second part on setValues updates each values with new value
    const onChange = (e)=>{
        e.preventDefault();
        setValues({...values, [e.target.name]: e.target.value});
    }

    console.log(values);
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    return ( <div>
            <form onSubmit={handleSubmit}>
                {inputs.map(input=><InputComponent 
                                        key={input.id} {...input} 
                                        value={values[input.name]}
                                        onChange={onChange}
                                        />)}
            </form>
        </div>
        );
}
 
export default TestForm;