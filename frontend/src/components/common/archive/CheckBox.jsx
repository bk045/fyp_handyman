import React from 'react';
const CheckBox = ({name, label, value, onChange}) => {
    return ( 
    <div className="form-check mb-6 mx-6 text-left">
        <label className="form-check-label inline-block -text--color-secondary">
        <input className="mr-4 -accent--color-primary-l" type="checkbox" value={value} id={name} name={name} onChange={onChange}/>
        {label}
        </label>
    </div> );
}
 
export default CheckBox;