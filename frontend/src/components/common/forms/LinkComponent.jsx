import React from 'react';
const LinkComponent = ({label}) => {
    return ( 
        <a
        href="#!"
        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
        >{label}</a> );
}
 
export default LinkComponent;