import React, {Component} from 'react';
import { useRef } from 'react';
import Form from '../forms/FormUpdate';
import axios from 'axios';
import InputField from '../forms/InputField';
import FormUpdate from '../forms/FormUpdate';
import AddressModal from '../../trial/modals/AddressModal';
// import TestModal from './ConfirmationModal';

const individualUEndPoint = 'http://127.0.0.1:8000/handyman/api/individuals/'
const id = "40"

class IndividualProfileOld extends FormUpdate {
    state = { 
            data:{
                id:"", 
                email:"",
                password:"",
                user_type:"",
                status:"",
                first_name:"", 
                middle_name:"", 
                last_name:"", 
                mobile:"", 
                gender:"", 
                province:"", 
                city:"", 
                area:"",
                role:"",
            },

            errors:{}, 
            showModal:false,  
        };

        // schema = {
        //     id: Joi.number().required().label("ID"),
        //     email: Joi.string().email().required().label("Email"),
        //     // .regex(new RegExp('^[a-zA-Z]$')) "/^[0-9+]{7}-[0-9+]{1}$/"
        //     user_type: Joi.string().required().min(3).max(30).label("User Type"),
        //     status: Joi.string().required().min(3).max(30).label("Status"),
        //     first_name: Joi.string().required().min(3).max(30).label("First Name"),
        //     // joi.number().empty(null).integer().min(0),
        //     middle_name: Joi.string().valid("").optional().max(30).label("Middle Name"),
        //     last_name: Joi.string().required().min(3).max(30).label("Last Name"),
        //     mobile: Joi.string().required().label("Mobile Phone"),
        //     gender: Joi.string().required().label("Gender"),
        //     province: Joi.string().required().label("Province"),
        //     city: Joi.string().required().label("City"), 
        //     area: Joi.string().min(4).max(30).required().label("Area"),
        //     // role: Joi.string().required().label("Role"), 
        // };
    
    async componentDidMount (){
        const{data} = await axios.get(individualUEndPoint + id + "/")
        const newData = this.mapRetrivedData(data);
        this.setState({data: newData})
        // console.log(this.state.data)
    }

    mapUpdateData(data){
        const obj = {
            id: data.id,
            email:data.email,
            password:data.password,
            user_type:data.user_type,
            status:data.profile_status,
            igp: {
                first_name:data.first_name, 
                middle_name:data.middle_name, 
                last_name:data.last_name, 
                mobile:data.mobile, 
                gender:data.gender, 
                province:data.province, 
                city:data.city, 
                area:data.area,
            },
        }
        return obj;
    }
    mapRetrivedData(data){
        const obj = {
            id: (data.id),
            email:data.email,
            password:data.password,
            user_type:data.user_type,
            status:data.profile_status,
            first_name:data.igp.first_name, 
            middle_name:data.igp.middle_name, 
            last_name:data.igp.last_name, 
            mobile:data.igp.mobile, 
            gender:data.igp.gender, 
            province:data.igp.province, 
            city:data.igp.city, 
            area:data.igp.area,
        }
        return obj;
    }

    handleUpdate=async(user)=>{
        const {data} = await axios.patch(individualUEndPoint + user.id + "/", {igp:{...user.igp}})
        console.log(data)
    }

    // change to doSubmit() method later
    doSubmit=()=>{
        const user = this.mapUpdateData(this.state.data)
        this.handleUpdate(user)
    }
    closeModal = ()=>{
        this.setState({showModal: false});
    }
    // handleChange = ({currentTarget: input}) =>{
    //     const {data: userinfo, errors: inputError} = this.state;
    //     const errors = {... inputError};
    //     let errorMessage = ""
    //     // Custom code for checking confirm password
    //     // if(input.name==='cpassword') errorMessage = this.checkTwoField('password', input.name);
    //     // else errorMessage = this.validateProperty(input);
        
    //     if (errorMessage) errors[input.name] = errorMessage
    //     else delete errors[input.name];
    //     // Updates states and changes the value for data 
    //     const data = {... userinfo};
    //     data[input.name] = input.value;
    //     this.setState({data, errors}); 
    // }


    render() {
        // onSubmit={event=>this.handleSubmit(event)}
        const {showModal} = this.state;
        return (<div className="shadow-myBoxShadow container p-20 w-[110rem] m-20">
            <div className='flex flex-col items-center'>
                <h2>Individual Profile</h2>
                <form>
                    <div className="flex justify-between">
                        <div>
                            {this.renderTextField("id", "ID", "text", true)}
                            {this.renderTextField("first_name", "First Name", "text", true)}
                            {this.renderTextField("middle_name", "Middle Name", "text", true)}
                            {this.renderTextField("last_name", "Last Name", "text", true)}
                            {this.renderTextField("email", "Email", "text", true)}
                        </div>
                        <div>
                            <div className="flex items-center">
                                {this.renderTextField("mobile", "Mobile", "text", true)}
                                <div>
                                    <button className="inline-block
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
                                        ease-in-out">Change Number</button>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {this.renderPasswordField("password", "Password", true)}
                                {/* {this.changePasswordBtn} */}
                                <div>
                                    <button className="inline-block
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
                                        ease-in-out">Reset Password</button>
                                </div>
                            </div>
                            {this.renderTextField("gender", "Gender", "text", true)}
                            <div className="mt-4 flex items-center">
                                <div>
                                    {this.renderTextField('province','Province', "text", true)}
                                    {this.renderTextField('city','City', "text", true)}
                                    {this.renderTextField("area", "Area", "text", true)}
                                </div>
                                <button className="inline-block
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
                                        ease-in-out" onClick={this.setState({showModal:true})}
                                        >
                                            Change Address</button>
                            </div>
                            {/* {showModal&&<TestModal closeModal={this.closeModal}/>} */}
                        </div>
                    </div>
                    {this.renderButton("Update Profile")}
                </form>
            </div> 
            
    </div>);
    }
}
 
export default IndividualProfileOld;