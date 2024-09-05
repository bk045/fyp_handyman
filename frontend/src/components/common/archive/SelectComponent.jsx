import React, { Component } from 'react';
const SelectComponent = ({name, label, values, onChange, error}) => {
    return ( 
    <div className="form-group text-left mx-4 mb-6">
        <label className="ml-2 font-medium" htmlFor={name}>{label}</label>
        <select 
            className="form-select appearance-none
                block
                w-full
                px-3
                py-1.5
                text-2xl
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                m-2
                focus:text-gray-700 focus:bg-white focus:-border--color-primary focus:outline-none" 
            id={name} 
            name={name}
            onChange={onChange}
        >
            <option value="">Choose {name.toLowerCase()}</option>
            {values.map(value=> <option key={value} value={value}>{value}</option>)}
        </select>
        {error && <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 ml-2 text-xl text-red-700">{error}</div>}
    </div> );
}
 
export default SelectComponent;