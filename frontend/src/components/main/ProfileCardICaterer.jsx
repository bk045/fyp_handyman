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


const ProfileCardICaterer = () => {
    
    const appData = useContext(AppContext);
    const {servicesList} = appData;
    const {user} = useContext(UserContext);
    const{info, profile} = user;
   
    const [editMode, setEditMode] = useState(false)
    const setStatusColor = ()=>{
        return (info.profile_status === 'Active'? 'text-green-600': 
                info.profile_status === 'Blocked'? 'text-red-600':'text-yellow-400')    
    }

    const initialValues = {
        first_name:profile.first_name, 
        middle_name:profile.middle_name, 
        last_name:profile.last_name,
        email:info.email, 
        mobile:profile.mobile,
        gender:profile.gender,
        profile_picture: profile.profile_picture,
        province:profile.province, 
        city:profile.city, 
        area:profile.area,
        id_type:profile.id_type,
        id_number:profile.id_number,
        id_photo: profile.id_photo,
        service_menu:[],
        services:[...profile.services],
        user_type:info.user_type,
    }

    const validationSchema = Yup.object({
        email:Yup.string().email().required().label('Email'), 
        mobile:Yup.string().required().label('Mobile'), 
        gender:Yup.string().required().label('Gender'), 
        province:Yup.string().required().label('Province'),
        city:Yup.string().required().label('City'), 
        area:Yup.string().required().label('Area'),
        id_type:Yup.string().nullable().label('ID Type'),
        id_number:Yup.string().nullable().label('ID Number'),
    })

    const getServices=()=>{
        let titles
        let count = 0;
        for (let c_service of profile.services){
            count = count + 1;
            for (let service of servicesList){
                if (c_service === service.service_id){
                    if (count === 1){
                        titles = service.title
                    }else{
                        titles = titles + ', ' + service.title
                    }
                }
            }
        }
        return titles;
    }
    
    const handleUpdate =()=>{
        setEditMode(!editMode)
        if (editMode){
            document.getElementById("p-update-btn").click();
        }
    }

    const getServicesId=(titles)=>{
        let serviceId=[];
        for (let title of titles){
            for (let item of servicesList){
                if (title === item.title){
                    serviceId = [...serviceId, item.service_id]
                }
            }
        }
        return serviceId;
    }

    const serviceOptions = ()=> {
        let options = []
        for (let item of servicesList){
            options = [...options, {'label': item.title, 'value': item.title}]
        }
        return options;
    }

    const onSubmit = async (values)=>{
        if(info.profile_status==="Pending" && values.service_menu.length !== 0){
            const ids = getServicesId(values.service_menu)
            values = {...values, 'services':[...ids]}
        }
        const userData = mapIndividualUserProfileData(values)
        const idType = typeof(userData.profile.id_photo)
        const profileType = typeof(userData.profile.profile_picture)
        if ((idType==='string'|| userData.profile.id_photo === null)&&(profileType==='string'|| userData.profile.profile_picture === null)){
            let userProfile =  {...userData.profile}
            delete userProfile['id_photo']
            delete userProfile['profile_picture']
            const fData = getFormDataForNonNestedObj(userProfile);
            await updateProfile(info.id, fData)  
        }
        else if ((idType ==='string'|| userData.profile.id_photo === null)&&(profileType !=='string'|| userData.profile.profile_picture !== null)){
            let userProfile =  {...userData.profile}
            delete userProfile['id_photo']
            console.log("User Profile Data -----", userProfile)
            const fData = getFormDataForNonNestedObj(userProfile);
            await updateProfile(info.id, fData)
        }
        else if ((idType !=='string'|| userData.profile.id_photo !== null)&&(profileType ==='string'|| userData.profile.profile_picture === null)){
            let userProfile =  {...userData.profile}
            delete userProfile['profile_picture']
            const fData = getFormDataForNonNestedObj(userProfile);
            await updateProfile(info.id, fData)
        }
        else{
            let userProfile =  {...userData.profile}
            const fData = getFormDataForNonNestedObj(userProfile);
            await updateProfile(info.id, fData)
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
                        <img src={profile.profile_picture} alt="Profile Picture" height="200px" width="200px"/>
                            {(info.profile_status !== 'Blocked' && editMode) && <div className="mt-4 mb-4"><input type='file' name='profile_picture' onChange={(e)=>formik.setFieldValue('profile_picture', e.target.files[0])}/>
                                            <div className="text-red-700">
                                                <ErrorMessage name='id_photo'></ErrorMessage>
                                            </div>
                                        </div>}
                        <h4>{profile.name}</h4>
                        <p>{getServices()}</p>
                        {(info.profile_status ==='Pending' && editMode) && <FormikControl control='multi-select' name='service_menu' options={serviceOptions()} placeholder="Select services..."
                            />}
                        <button id="p-update-btn" type='submit' onClick={()=>onSubmit(formik.values)}>Update</button>
                    </div>
                    <div className="right">
                        <div className="top-bar">
                            <div className="status"><FaCircle size={'2.5rem'} className={setStatusColor()}/><span className="text">{info.profile_status}</span></div>
                            <span className="edit-mode">
                                Edit Mode<ToggleSwitch rounded={true} handleToggle={handleUpdate}/>
                            </span>
                        </div>
                        <div className="information">
                            <h3>Information</h3>
                            <div className="info_data">
                                <div className="data">
                                    <FormikControl control='input' type='text' name='email' label='Email' value={info.email} disabled={true}/>
                                </div>
                                <div className="data">
                                    <FormikControl control='input' type='text' name='mobile' label='Mobile' disabled={info.profile_status ==='Blocked' || !editMode}/>
                                </div>
                                <div className="data">
                                    <FormikControl control='input' type='text' name='gender' label='Gender' disabled={true}/>
                                </div>
                            </div>
                        </div>
                        <div className="address">
                            <h3>Address</h3>
                            <div className="address_data">
                                <div className="data">
                                    <FormikControl control='input' type='text' name='province' label='Province' disabled={info.profile_status ==='Blocked' || !editMode}/>
                                </div>
                                <div className="data">
                                    <FormikControl control='input' type='text' name='city' label='City' disabled={info.profile_status ==='Blocked' || !editMode}/>
                                </div>
                                <div className="data">
                                    <FormikControl control='textarea' type='text' name='area' label='Area' disabled={info.profile_status ==='Blocked' || !editMode}/>
                                </div>
                            </div>
                        </div>
                        <div className="document">
                            <h3>Documents</h3>
                            <div className="document_data">
                                <div className="data">
                                    <FormikControl control='input' type='text' name='id_type' value={initialValues.id_type==="null"?"-":initialValues.id_type} label='ID Type' disabled={info.profile_status!=='Pending' || !editMode}/>
                                </div>
                                <div className="data">
                                    <FormikControl control='input' type='text' name='id_number' value={initialValues.id_number==="null"?"-":initialValues.id_number} label='ID No' disabled={info.profile_status!=='Pending' || !editMode}/>
                                </div>
                                <div className="data">
                                <label htmlFor="id_photo">Document Photo</label>
                                    {(info.profile_status === 'Pending' && editMode) && <div>
                                            <input type='file' name='id_photo' label='Document Photo' onChange={(e)=>formik.setFieldValue('id_photo', e.target.files[0])}/>
                                            <div className="text-red-700">
                                                <ErrorMessage name='id_photo'></ErrorMessage>
                                            </div>
                                        </div>}
                                        {profile.id_photo && <img src={profile.id_photo} alt="Doc" height="100px" width="100px"/>}
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
 
export default ProfileCardICaterer;