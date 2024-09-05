import React, {Component} from 'react';
import Form from './Form';

class LoginForm extends Form {
    state = { 
            data:{username:"", password:""},
            errors:{} }
    //Schema for Joi validator
    // schema = {
    //     username: Joi.string().required().label("Username"),
    //     password: Joi.string().required().label("Password"),
    // };
    doSubmit=()=>{
        console.log("Submitted");
    }
    render() {
        return (
        <div className="shadow-myBoxShadow container p-20 flex flex-col items-center w-[110rem] m-20">
            <div className="flex justify-center items-center text-gray-800">
                <div className="w-[50rem] h-[20rem] mr-20">
                    <img
                    src="/images/logo.png"
                    className="w-full"
                    alt="Company Logo"
                    />
                </div>
                <div className="">
                    <h2>Login Form</h2>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderTextField("username", "Username")}
                        {this.renderTextField("password", "Password", "password")}
                        <div className="flex justify-between">
                            {this.renderCheckBox("rememberMe", "Remember me", 1)}
                            {this.renderLink("Forgot Password?")}
                        </div>
                        {this.renderButton("Submit")}
                    </form>
                </div>
            </div>
        </div>);
    }
}
 
export default LoginForm;