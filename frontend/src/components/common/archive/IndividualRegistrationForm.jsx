import React, {Component} from 'react';
import Form from './Form';
import axios from 'axios';

const individualUEndPoint = 'http://127.0.0.1:8000/handyman/api/individuals/'

class IndividualRegistrationForm extends Form {
    state = { 
            data:{
                password:"", 
                cpassword:"", 
                email:"", 
                fname:"", 
                mname:"", 
                lname:"", 
                mobile:"", 
                gender:"", 
                province:"", 
                city:"", 
                area:"",
                role:"",
            },
            errors:{},   
        };
    
    
    role = React.createRef();
    // componentDidMount(){
    //     this.username.current.focus();
    // }

    //Schema for Joi validator
    // schema={}
    stateData = {
        password:"", 
        cpassword:"", 
        email:"", 
        fname:"", 
        mname:"", 
        lname:"", 
        mobile:"", 
        gender:"", 
        province:"", 
        city:"", 
        area:"",
        role:"",
        // services:"",
    }
    // schema = {
    //     password: Joi.string().required().min(5).max(30).label("Password"),
    //     cpassword: Joi.string().required().min(5).max(30).label("Confirm Password"),
    //     email: Joi.string().email().required().label("Email"),
    //     // .regex(new RegExp('^[a-zA-Z]$')) "/^[0-9+]{7}-[0-9+]{1}$/"
    //     fname: Joi.string().required().min(3).max(30).label("First Name"),
    //     // joi.number().empty(null).integer().min(0),
    //     mname: Joi.string().valid("").optional().max(30).label("Middle Name"),
    //     lname: Joi.string().required().min(3).max(30).label("Last Name"),
    //     mobile: Joi.string().required().label("Mobile Phone"),
    //     gender: Joi.string().required().label("Gender"),
    //     province: Joi.string().required().label("Province"),
    //     city: Joi.string().required().label("City"), 
    //     area: Joi.string().min(4).max(30).required().label("Area"),
    //     role: Joi.string().required().label("Role"), 
    // };

    // checkRole=()=>{
        
    //     const {currentRole} = this.role.current()
    //     let data = {}
    //     if (currentRole === "Individual Caterer"){
    //         data = {...this.stateData, services:""}
    //     }
    //     else{
    //         data = {...this.stateData}
    //     }
    //     this.setState({data})
    // }
    // setSchema(){
    //     const {role} = this.state.data
    //     if (role === 'Individual Caterer'){
    //         this.schema = {...this.schema, services: Joi.string().required().label("Services")}
    //     }
    // };

    userData(){
        const {password, email, role, fname, mname, lname, mobile, gender, province, city, area} = this.state.data
        const   status = (role === 'Individual') ? 'Active' : 'Pending'
        const sendData = {
            email: email,
            username: (fname+mname+lname),
            password: password,
            user_type: role,
            profile_status: status,
            igp:{first_name: fname,
            middle_name: mname,
            last_name: lname,
            gender: gender,
            mobile: mobile,
            province: province,
            city: city,
            area: area}
        }
        return sendData;
    }


    handleDelete=async(apiEndPoint, pk)=>{
        const{data: user} = await axios.delete(apiEndPoint + pk)
        return user
    }


    doSubmit=async ()=>{
        const user = this.userData();
        
        
        const {data:post} = await axios.post(individualUEndPoint, user)
        console.log(post);
     
    }

    

    render() {
    
        return (<div className="shadow-myBoxShadow container p-20 flex flex-col items-center w-[110rem] m-20">
            <div>
                <h2>Individual Registration Form</h2>
                <button onClick={()=>this.handleDelete(individualUEndPoint, "28")} >Delete</button>
                <form onSubmit={this.handleSubmit}>
                    <div className="flex">
                        {this.renderTextField("fname", "First Name")}
                        {this.renderTextField("mname", "Middle Name")}
                        {this.renderTextField("lname", "Last Name")}
                    </div>
                    {this.renderTextField("mobile", "Moble Phone")}
                    <div className="mb-6 mx-4 flex">
                        <label className="mx-2 mb-2">Gender</label>
                        <div className="pl-8 flex">
                            {this.renderRadioButton("gender", "Male", "Male")}
                            {this.renderRadioButton("gender", "Female", "Female")}
                        </div>
                    </div>
                    <div className="flex">
                    </div>
                        {this.renderSelect('province','Province',['Province-1'])}
                        {this.renderSelect('city','City',['Kathmandu', 'Bhaktapur', 'Lalitpur'])}
                        {this.renderTextField("area", "Area")}
                    {this.renderTextField("email", "Email")}
                    {this.renderPasswordField("password", "Password")}
                    {this.renderPasswordField("cpassword", "Confirm Password")}
                    <div className="mb-6 mx-4 flex">
                        <label className="mx-2 mb-2" >What are you?</label>
                        <div className="pl-8 flex" 
                        // onClick={this.checkRole}
                        >
                            {this.renderRadioButton("role", "Service Provider", "Individual Caterer")}
                            {this.renderRadioButton("role", "Customer", "Individual")}
                        </div>
                    </div>
                    {(this.state.data.role === 'Individual Caterer') && this.renderTextField("services", "Services")}
                    {this.renderButton("Register")}
                </form>
            </div>
            
    </div>);
    }
}
 
export default IndividualRegistrationForm;