import React from 'react';

const SearchBox = ({name, placeholder, value, onChange}) => {
    return ( 
        <div className="form-group mb-6">
            <input type="search" 
                id={name} 
                name={name} 
                value={value} 
                placeholder={placeholder} 
                onChange={onChange}

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
                focus:text-gray-700 
                focus:bg-white 
                focus:-border--color-primary 
                focus:outline-none" />
        </div>
            );
}
 
export default SearchBox;


