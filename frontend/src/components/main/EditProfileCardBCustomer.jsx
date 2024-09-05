import React, {useState, useContext} from "react";
import {ErrorMessage, Form, Formik} from 'formik'
import FormikControl from '../common/forms/FormikControl';
import { FaCircle } from "react-icons/fa";
import * as Yup from 'yup'
import ToggleSwitch from "../common/forms/ToggleSwitch";
import {mapBusinessUserProfileData} from '../../services/mapService'
import {updateProfile} from '../../services/authService'
import { AppContext, UserContext } from "../../services/contextService";
import { useLocation } from 'react-router-dom';
import { getFormDataForNonNestedObj } from "../../utils/stringManipulation";


const EditProfileCardBCustomer = () => {
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
        profile_picture: user_profile.profile_picture,
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
        if(values.type_of_business_menu){
            values = {...values, 'type_of_business':values.type_of_business_menu}
        }
        const userData = mapBusinessUserProfileData(values, 'b-customer')
        
        const documentType = typeof(userData.profile.document_photo)
        const profileType = typeof(userData.profile.profile_picture)
        if ((documentType==='string'|| userData.profile.document_photo === null)&&(profileType==='string'|| userData.profile.profile_picture === null)){
            let userProfile =  {...userData.profile}
            delete userProfile['document_photo']
            delete userProfile['profile_picture']
            const fData = getFormDataForNonNestedObj(userProfile);
            await updateProfile(user_profile.user_id, fData)  
        }
        else if ((documentType ==='string'|| userData.profile.document_photo === null)&&(profileType !=='string'|| userData.profile.profile_picture !== null)){
            let userProfile =  {...userData.profile}
            delete userProfile['document_photo']
            const fData = getFormDataForNonNestedObj(userProfile);
            await updateProfile(user_profile.user_id, fData)
        }
        else if ((documentType !=='string'|| userData.profile.document_photo !== null)&&(profileType ==='string'|| userData.profile.profile_picture === null)){
            let userProfile =  {...userData.profile}
            delete userProfile['profile_picture']
            const fData = getFormDataForNonNestedObj(userProfile);
            await updateProfile(user_profile.user_id, fData)
        }
        else{
            let userProfile =  {...userData.profile}
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
                                        
                            
                            <h4>{user_profile.name_of_business}</h4>
                            <p>{user_profile.type_of_business}</p>
                            {(editMode) && <div className="select">
                                <FormikControl control='select' name='type_of_business_menu' options={businessOptions()} placeholder="Select business..."
                                />
                            </div>}
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
                                        <FormikControl control='input' type='text' name='person_to_contact' label='Contact Person' disabled={!editMode}/>
                                    </div>
                                    <div className="data">
                                        <FormikControl control='input' type='text' name='email' label='Email' disabled={true}/>
                                    </div>
                                    <div className="data">
                                        <FormikControl control='input' type='text' name='person_phone' label='Contact Number' disabled={!editMode}/>
                                    </div>
                                </div>
                            </div>
                            <div className="address">
                                <h3>Address</h3>
                                <div className="address_data">
                                <div className="data">
                                        <FormikControl control='input' type='text' name='province' label='Province' disabled={!editMode}/>
                                    </div>
                                    <div className="data">
                                        <FormikControl control='input' type='text' name='city' label='City' disabled={!editMode}/>
                                    </div>
                                    <div className="data">
                                        <FormikControl control='textarea' type='text' name='area' label='Area' disabled={!editMode}/>
                                    </div>
                                </div>
                            </div>
                            <div className="document">
                                <h3>Documents</h3>
                                <div className="document_data">
                                    <div className="data">
                                        <FormikControl control='input' type='text' name='registration_no' label='Registartion No' value={user_profile.registration_no!=='null'?user_profile.registration_no:''} disabled={!editMode}/>
                                    </div>
                                    <div className="data">
                                            <label htmlFor="document_photo">Document Photo</label>
                                    {(editMode) && <div>
                                            <input type='file' name='document_photo' label='Document Photo' onChange={(e)=>formik.setFieldValue('document_photo', e.target.files[0])}/>
                                            <div className="text-red-700">
                                                <ErrorMessage name='document_photo'></ErrorMessage>
                                            </div>
                                        </div>}
                                        {user_profile.document_photo && <img src={user_profile.document_photo} alt="Doc" height="100px" width="100px"/>}
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
 
export default EditProfileCardBCustomer;