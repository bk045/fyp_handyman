import React from 'react';
const InputComponent = (props) => {
    const {label, onChange, id, ...inputAttributes} = props;
    return ( 
    <div className='m-2'>
        {/* <label>{props.label}</label> */}
        <input {...inputAttributes} onChange={onChange}/>
    </div> );
}
 
export default InputComponent; 