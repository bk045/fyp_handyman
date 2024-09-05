import React from 'react';
const InputField = (props) => {
    const {name, label, value, type, readonly, onChange, onBlur, placeholder=""} = props;
    return ( 
    <div className="form-group mb-6 mx-4 text-left">
        <label className="mx-2 -text--color-secondary font-medium" htmlFor={name}>{label}</label>
        <input 
            value={value} 
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            id={name} 
            type={type} 
            readOnly = {readonly}
            placeholder={placeholder}
            className="form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-2xl
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    m-2
                    disabled:text-gray-400
                    focus:text-gray-700 
                    focus:bg-white 
                    focus:-border--color-primary 
                    focus:outline-none" />
            {/* {error && <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 ml-2 text-xl text-red-700">{error}</div>} */}
    </div> );
}
 
export default InputField;