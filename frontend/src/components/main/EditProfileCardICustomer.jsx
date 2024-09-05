import React, {useState, useContext} from "react";
import {Form, Formik, ErrorMessage} from 'formik'
import FormikControl from '../common/forms/FormikControl';
import * as Yup from 'yup'
import { FaCircle } from "react-icons/fa";
import ToggleSwitch from "../common/forms/ToggleSwitch";
import {mapIndividualUserProfileData} from '../../services/mapService'
import {updateProfile} from '../../services/authService'
import { AppContext, UserContext } from "../../services/contextService";
import { getFormDataForNonNestedObj } from "../../utils/stringManipulation";
import { useLocation } from 'react-router-dom';




const EditProfileCardICustomer = () => {
    const location = useLocation();
    const {obj:user_profile} = location.state
   
    
    const [editMode, setEditMode] = useState(false)

    const setStatusColor = ()=>{
        return (user_profile.profile_status === 'Active'? 'text-green-600': 
                user_profile.profile_status === 'Blocked'? 'text-red-600':'text-yellow-400')    
    }

    const initialValues = {
        first_name:user_profile.first_name, 
        middle_name:user_profile.middle_name, 
        last_name:user_profile.last_name,
        email:user_profile.email, 
        mobile:user_profile.mobile,
        gender:user_profile.gender,
        profile_picture: user_profile.profile_picture,
        province:user_profile.province, 
        city:user_profile.city, 
        area:user_profile.area,
        user_type:user_profile.user_type,
    }

    const validationSchema = Yup.object({
        mobile:Yup.string().required().label('Mobile'), 
        gender:Yup.string().required().label('Gender'), 
        province:Yup.string().required().label('Province'),
        city:Yup.string().required().label('City'), 
        area:Yup.string().required().label('Area'),
    })

    const handleUpdate =()=>{
        setEditMode(!editMode)
        if (editMode){
            document.getElementById("p-update-btn").click();
        }
    }
    const onSubmit=async (values)=>{
        const userData = mapIndividualUserProfileData(values, 'i-customer')
        const profileType = typeof(userData.profile.profile_picture)

        if (profileType==='string'|| userData.profile.profile_picture === null){
            let userProfile =  {...userData.profile}
            delete userProfile['profile_picture']
            const fData = getFormDataForNonNestedObj(userProfile);
            await updateProfile(user_profile.user_id, fData)  
        }
        else{
            console.log('Running')
            let userProfile =  {...userData.profile}
            console.log('FD Profile',userProfile)
            const fData = getFormDataForNonNestedObj(userProfile);
            await updateProfile(user_profile.user_id, fData)
        }
    }
    return ( 
        <>
            <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >{
                    formik=> {
                            return <Form>
                <div className="outlet-container profile-container">
                    <div className="profile-wrapper shadow-myBoxShadow">
                        <div className="left">
                        <img src={user_profile.profile_picture} alt="Profile Picture" height="200px" width="200px"/>
                            {(editMode) && <div className="mt-4 mb-4"><input type='file' name='profile_picture' onChange={(e)=>formik.setFieldValue('profile_picture', e.target.files[0])}/>
                                            <div className="text-red-700">
                                                <ErrorMessage name='document_photo'></ErrorMessage>
                                            </div>
                                        </div>}
                            <h4>{user_profile.name}</h4>
                            <button id="p-update-btn" type='submit'>Update</button>
                        </div>
                        <div className="right">
                            <div className="top-bar">
                                <div className="status"><FaCircle size={'2.5rem'} className={setStatusColor()}/><span className="text">{user_profile.profile_status}</span></div>
                                <span className="edit-mode">
                                    Edit Mode<ToggleSwitch rounded={true} handleToggle={handleUpdate}/>
                                </span>
                            </div>
                            <div className="information">
                                <h3>Information</h3>
                                <div className="info_data">
                                    <div className="data">
                                        <FormikControl control='input' type='text' name='email' label='Email' disabled={true}/>
                                    </div>
                                    <div className="data">
                                        {/* <h4>Mobile</h4> */}
                                        <FormikControl control='input' type='text' name='mobile' label='Mobile' disabled={!editMode}/>
                                    </div>
                                    <div className="data">
                                        {/* <h4>Gender</h4> */}
                                        <FormikControl control='input' type='text' name='gender' label='Gender' disabled={true}/>
                                    </div>
                                </div>
                            </div>
                            <div className="address">
                                <h3>Address</h3>
                                <div className="address_data">
                                    <div className="data">
                                        {/* <h4>Province</h4> */}
                                        <FormikControl control='input' type='text' name='province' label='Province' disabled={!editMode}/>
                                    </div>
                                    <div className="data">
                                        {/* <h4>City</h4> */}
                                        <FormikControl control='input' type='text' name='city' label='City' disabled={!editMode}/>
                                    </div>
                                    <div className="data">
                                        {/* <h4>Area</h4> */}
                                        <FormikControl control='textarea' type='text' name='area' label='Area' disabled={!editMode}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Form>
                    }
                }
            </Formik>
        </>
     );
}
 
export default EditProfileCardICustomer;