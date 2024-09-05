import React, {Component} from 'react';
import Form from '../forms/Form';

class BusinessRegistrationForm extends Form {
    state = { 
            data:{
                // username:"", 
                email:"",
                password:"", 
                cpassword:"", 
                businessName:"", 
                contactPerson:"", 
                personContact:"", 
                province:"", 
                city:"", 
                area:"",
                role:""
                },
            errors:{},    
        };
    
    // createPayLoad=()=>{
    //     const exclude = ['cpassword'];
    //     const obj = {};
    //     const {data} = this.state;
    //     for (data.)

    // }
    //Schema for Joi validator
    // schema = {
    //     // username: Joi.string().required().min(5).max(30).label("Username"),
    //     password: Joi.string().required().min(5).max(30).label("Password"),
    //     cpassword: Joi.string().required().min(5).max(30).label("Confirm password"),
    //     email: Joi.string().email().required().label("Business Email"),
    //     businessName: Joi.string().min(5).max(50).label("Name of business"),
    //     contactPerson: Joi.string().required().min(3).max(30).label("First Name"),
    //     personContact: Joi.string().required().label("Mobile Phone"),
    //     province: Joi.string().required().label("Province"),
    //     city: Joi.string().required().label("City"), 
    //     area: Joi.string().min(4).max(30).required().label("Area"),
    //     role: Joi.string().required().label("Role"),
    // };
    doSubmit=()=>{
        console.log("Submitted");
    }
    
    render() {
        console.log(this.state.errors)
        return (
        <div className="shadow-myBoxShadow container p-20 flex flex-col items-center w-[110rem] m-20">
            <div>
                <h2 className='text-center'>Business Registration Form</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.renderTextField("businessName", "Name of business")}
                    {this.renderTextField("email", "Business Email")}
                    {this.renderTextField("contactPerson", "Name of person to contact")}
                    {this.renderTextField("personContact", "Contact person moble phone")}
                    {this.renderSelect('province','Province',['Bagmati'])}
                    {this.renderSelect('city','City',['Kathmandu', 'Bhaktapur', 'Lalitpur'])}
                    {this.renderTextField("area", "Area")}
                    {/* {this.renderTextField("email", "Email")} */}
                    {this.renderPasswordField('password', 'Password')}
                    {this.renderPasswordField('cpassword', 'Confirm Password')}
                    <div className="mb-6 mx-4 flex">
                        <label className="mx-2 mb-2 font-medium" >What are you?</label>
                        <div className="pl-8 flex">
                            {this.renderRadioButton("role", "Service Provider", "ISP")}
                            {this.renderRadioButton("role", "Customer", "IC")}
                        </div>
                    </div>
                    {this.renderButton("Register")}
                </form>
            </div>
    </div>);
    }
}
 
export default BusinessRegistrationForm;