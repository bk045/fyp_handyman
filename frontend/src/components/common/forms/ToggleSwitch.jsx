import React, { useState } from "react";

const ToggleSwitch = ({rounded, handleToggle}) => {

    const shapeSlider = (rounded) =>{
        if (rounded)
            return "t-slider round"
        return "t-slider"
    }
    const shapeToggle = (rounded) =>{
        if (rounded)
            return "toggle round"
        return "toggle"
    }
    return (
        <>
            <label className="t-switch">
                <input type="checkbox" onChange={handleToggle}/>
                <span className={shapeToggle(rounded)}/>
                <span className={shapeSlider(rounded)}/>
            </label>
        </>
     );
}
 
export default ToggleSwitch;