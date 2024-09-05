import React, { Component } from 'react';
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

class PasswordField extends Component {
    state = { 
        hide: true,
     } 
    handlePasswordDisplay=()=>{
        let {hide} = this.state;
        hide = !hide;
        this.setState({hide});
    }
    render() {
        const {value, name, onChange, label, error, disabled} = this.props;
        const {hide} = this.state;
        return (
    <div className="form-group mb-6 mx-4 text-left">
    <div className="relative">
        <label className="mx-2 -text--color-secondary font-medium" htmlFor={name} onClick={this.handlePasswordDisplay}>{label}</label>
        <input 
            value={value} 
            name={name}
            onChange={onChange}
            id={name} 
            type={hide?'password':'text'}
            disabled = {disabled}
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
    
        <div className="absolute right-0 top-14 cursor-pointer" onClick={this.handlePasswordDisplay}>{hide?<AiFillEyeInvisible color='#d05e0d'/>:<AiFillEye color='#d05e0d'/>}</div>
    </div>
            {error && <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 ml-2 text-xl text-red-700">{error}</div>}
    </div>
        );
    }
}

export default PasswordField;
