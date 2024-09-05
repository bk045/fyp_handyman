import React, {useState, useContext} from "react";
import {Form, Formik} from 'formik'
import FormikControl from '../common/forms/FormikControl';
import { FaCircle } from "react-icons/fa";
import * as Yup from 'yup'
import ToggleSwitch from "../common/forms/ToggleSwitch";
import {mapBusinessUserProfileData} from '../../services/mapService'
import {updateProfile} from '../../services/authService'
import { AppContext } from "../../services/contextService";
import { useLocation } from 'react-router-dom';
import { getFormDataForNonNestedObj } from "../../utils/stringManipulation";



const ProfileCardBCustomerEdit = () => {
    const appData = useContext(AppContext);
    const {businessList} = appData;
    const location = useLocation();
    const {obj:user_profile} = location.state
    
    const [editMode, setEditMode] = useState(false)
    const setStatusColor = ()=>{
        return (user_profile.profile_status === 'Active'? 'text-green-600': 
        user_profile.profile_status === 'Blocked'? 'text-red-600':'text-yellow-400')    
    }
    
    const initialValues = {
        name_of_business:user_profile.name_of_business,
        person_to_contact:user_profile.person_to_contact,
        email:user_profile.email, 
        person_phone:user_profile.person_phone,
        province:user_profile.province, 
        city:user_profile.city, 
        area:user_profile.area,
        document_photo:user_profile.document_photo,
        registration_no:user_profile.registration_no,
        type_of_business_menu:"",
        type_of_business:user_profile.type_of_business,
        user_type:user_profile.user_type,
    }

    const validationSchema = Yup.object({
        email:Yup.string().email().required().label('Email'),
        person_to_contact:Yup.string().required().label('Contact Person'),
        person_phone:Yup.string().required().label('Contact Number'),
        province:Yup.string().required().label('Province'),
        city:Yup.string().required().label('City'), 
        area:Yup.string().required().label('Area'),
        // registration_no:Yup.string().label('Registration No'),
        // document_photo:Yup.string().label('Document Photo'),
    })
    

    const handleUpdate =()=>{
        setEditMode(!editMode)
        if (editMode){
            document.getElementById("p-update-btn").click();
        }
    }
  
    
    const businessOptions = ()=> {
        let options = []
        for (let item of businessList){
            options = [...options, {'key': item.name_of_business, 'value': item.name_of_business}]
        }
        return options;
    }

    const onSubmit = async (values)=>{
        if(user_profile.profile_status==="Pending" && values.type_of_business_menu){
            values = {...values, 'type_of_business':values.type_of_business_menu}
        }
        console.log("To pass",values)
        const userData = mapBusinessUserProfileData(values)
        console.log("After Mapped", userData)
        const fData = getFormDataForNonNestedObj(userData);
        await updateProfile(user_profile.id, fData)
        await updateProfile(user_profile.id, userData.profile)
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
                            <img src="https://i.imgur.com/bDLhJiP.jpg" alt="Profile"/>
                            <h4>{user_profile.name_of_business}</h4>
                            <p>{user_profile.type_of_business}</p>
                            {(user_profile.profile_status ==='Pending' && editMode) && <FormikControl control='select' name='type_of_business_menu' options={businessOptions()} placeholder="Select business..." 
                            />}
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
                                        <FormikControl control='input' type='text' name='person_to_contact' label='Contact Person' disabled={user_profile.profile_status ==='Blocked' || !editMode}/>
                                    </div>
                                    <div className="data">
                                        <FormikControl control='input' type='text' name='email' label='Email' disabled={true}/>
                                    </div>
                                    <div className="data">
                                        <FormikControl control='input' type='text' name='person_phone' label='Contact Number' disabled={user_profile.profile_status ==='Blocked' || !editMode}/>
                                    </div>
                                </div>
                            </div>
                            <div className="address">
                                <h3>Address</h3>
                                <div className="address_data">
                                <div className="data">
                                        <FormikControl control='input' type='text' name='province' label='Province' disabled={user_profile.profile_status ==='Blocked' || !editMode}/>
                                    </div>
                                    <div className="data">
                                        <FormikControl control='input' type='text' name='city' label='City' disabled={user_profile.profile_status ==='Blocked' || !editMode}/>
                                    </div>
                                    <div className="data">
                                        <FormikControl control='textarea' type='text' name='area' label='Area' disabled={user_profile.profile_status ==='Blocked' || !editMode}/>
                                    </div>
                                </div>
                            </div>
                            <div className="document">
                                <h3>Documents</h3>
                                <div className="document_data">
                                    <div className="data">
                                        <FormikControl control='input' type='text' name='registration_no' label='Registartion No' value={user_profile.registration_no} disabled={user_profile.profile_status!=='Pending' || !editMode}/>
                                    </div>
                                    <div className="data">
                                        <FormikControl control='input' type='file' name='document_photo' label='Document Photo'/>
                                        {/* <div className="picture"><img src={user_profile.document_photo} alt="Document Picture" /></div> */}
                                        <img src={user_profile.document_photo} alt="Doc" height="100px" width="100px"/>
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
 
export default ProfileCardBCustomerEdit;