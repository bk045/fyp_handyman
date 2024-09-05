import React, { Component } from 'react';
// import Joi, { errors } from 'joi-browser';
import InputField from './InputField';
import SelectComponent from './SelectComponent';
import CheckBoxComponent from './CheckBox';
import LinkComponent from './LinkComponent';
import RadioButtonComponent from './RadioButtonComponent';
import PasswordField from './PasswordField';

class Form extends Component {
    state = { 
        data: {},
        errors: {},
     }
     
    //  validate=()=>{
    //     //BETTER METHOD:
    //     const option = { abortEarly: false };
    //     const {error} = Joi.validate(this.state.data, this.schema, option);
    //     if (!error) return null;
    //     const errors = {};
    //     for (let item of error.details){
    //         errors[item.path[0]] = item.message;
    //     };
    //     return errors;
    // }
    // validateProperty = ({name, value}) =>{
    //     // BETTER METHOD:
    //     const obj = { [name]: value};
    //     const schema = { [name]: this.schema[name]};
    //     const {error} = Joi.validate(obj, schema);
    //     return error ? error.details[0].message : null ;
    // }

    // //event = e has attribute called currentTarget.
    // handleChange = ({currentTarget: input}) =>{
    //     const {data: userinfo, errors: inputError} = this.state;
    //     const errors = {... inputError};
    //     let errorMessage = ""
    //     // Custom code for checking confirm password
    //     if(input.name==='cpassword') errorMessage = this.checkTwoField('password', input.name);
    //     else errorMessage = this.validateProperty(input);
        
    //     if (errorMessage) errors[input.name] = errorMessage
    //     else delete errors[input.name];
    //     // Updates states and changes the value for data 
    //     const data = {... userinfo};
    //     data[input.name] = input.value;
    //     this.setState({data, errors}); 
    // }

    // handleSubmit = e => {
    //     e.preventDefault(); 
    //     const errors = this.validate();
    //     this.setState({errors: errors || { }})

    //     // Update in server 
    //     this.doSubmit();
    // };

    // handleUpdate = () =>{
    //     console.log('Updated')
    // }

    // checkTwoField(fElementID, sElementID){
    //     let error = {};
    //     const fValue = document.getElementById(fElementID).value;
    //     const sValue = document.getElementById(sElementID).value;
        
    //     if (fValue !== sValue){
    //         error[sElementID] = "Confirm password does not match with password.";
    //         return error[sElementID];
    //     }
    //     return error[sElementID];
    // }
    renderButton(label){
        // <h3>{label}</h3>
        return(<button disabled={this.validate()} className="inline-block
            px-6 py-2.5
             -bg--color-primary-l
             text-white
             text-2xl
             rounded
             shadow-md
            disabled:-bg--color-primary-l/50
            hover:-bg--color-primary
            hover:shadow-lg
            active:-bg--color-primary-l
            active:shadow-lg
            transition
            duration-150
            ease-in-out">{label}</button>);
    }
    
    renderTextField(name, label, type="text"){
        const {data, errors} = this.state;
        return(<InputField 
            label={label}
            name={name}
            value={data[name]}
            onChange={this.handleChange}
            type={type}
            error={errors[name]}
        ></InputField>);
    }
    renderPasswordField(name, label){
        const {data, errors} = this.state;
        return(<PasswordField 
            label={label}
            name={name}
            value={data[name]}
            onChange={this.handleChange}
            error={errors[name]}
        ></PasswordField>);
    }

    renderSelect(name, label, lists){
        const {errors} = this.state;
        return(<SelectComponent
            name={name}
            label={label}
            values = {lists}
            onChange={this.handleChange}
            error={errors[name]}
        />);
    }

    renderCheckBox(name, label, value){
        return (<CheckBoxComponent
            name = {name}
            label = {label}
            value = {value}
        />)
    }

    renderRadioButton(name, label, value, selected){
        return(<RadioButtonComponent
            name={name}
            label = {label}
            value = {value}
            onChange = {this.handleChange}
            selected = {selected}
            // ref = {name}
        />)
    }

    renderLink(label){
        return(<LinkComponent
            label= {label}
        />)
    }

}
 
export default Form;