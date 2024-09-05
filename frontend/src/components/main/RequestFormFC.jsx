import React, { useState, useContext, useEffect } from 'react';
import {Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import { getErrorMessage } from '../../services/errorMessageService';
import { mapIndividualUserData } from '../../services/mapService';
import FormikControl from '../common/forms/FormikControl';
import * as Yup from 'yup'
import ModalControler from '../common/modal/ModalControler';
import 'react-toastify/dist/ReactToastify.css'
import * as userService from '../../services/authService'
import * as requestService from '../../services/requestService'
import { cityOptions, genderOptions, provinceOptions } from '../../db/formData';
import { UserContext } from "../../services/contextService";
import { useLocation } from 'react-router-dom';



const btnClass="inline-block px-6 py-2.5 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"
const inputClass = "form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-2 disabled:text-gray-400 focus:text-gray-700 focus:bg-white focus:-border--color-primary focus:outline-none"

const problemOptions = [
    {key:'Customer', value:'i-customer'},
    {key:'Service Provider', value:'i-caterer'},
]

const RequestFormFC = () => {
    const {user} = useContext(UserContext);

    const [catererServices, setCatererServices] = useState([])
    
    useEffect(()=>{
        requestService.getServiceProviderServices(location.state.caterer_id).then(response =>{
            const {data} = response;
            setCatererServices(data)
        });
    },[])

    const [modalState, setModalState] = useState({
        visibility:false,
        modalType:"",
    });
    
    const location = useLocation();

    const fetchedData=(obj)=>{
        if (obj.response==='positive'){
            setModalState({visibility: false})
        }
    }
    
    const initialValues = {
        // req_date_time:new Date(),
        client_id: user.info.id,
        caterer_id: location.state.caterer_id, 
        city:"", 
        area:"",
        req_service:"",
        proposed_date_time:"",
        description:"",
        req_status:"Placed"
    }

    const validationSchema = Yup.object({
        req_service:Yup.string().required().label('Required service'),
        description:Yup.string().required().label('Description'),
        proposed_date_time:Yup.date().required().label("Proposed date and time"),
        city:Yup.string().required().label('City'), 
        area:Yup.string().required().label('Area'),
    })
   const serviceToSelectOptions=(catererServices)=>{
        let options = [{key:'Select...', value:""}]
        for (let service of catererServices){
            options = [...options, {'value':service.title, 'key':service.title}]
        }
        return options
   }
    const onSubmit = async (values, propsOnSubmit) =>{
        values = {...values, 'client_id': initialValues.client_id}
        console.log("Values------", values)
        await requestService.makeRequest(values)
        setModalState({visibility:true,
                        modalType:'alert'})     
    }

    return (
        <div className='shadow-myBoxShadow reg-container form-wrapper outlet-container'>
            <div className="form-container">
                <h2>Request Form</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {
                        formik=> {
                                return <Form>
                                            <FormikControl className={inputClass} control='select' name='req_service' label='Required service' options={serviceToSelectOptions(catererServices)}/>
                                            <FormikControl className={inputClass} control='textarea' name='description' label='Description'/>
                                            <FormikControl className={inputClass} control='date' name='proposed_date_time' label='Proposed Date and Time'/>

                                            <FormikControl className={inputClass} control='select' name='city' label='City' options={cityOptions}/>
                                            <FormikControl className={inputClass} control='textarea' name='area' label='Area'/>
                
                                            <button type='submit' className={btnClass} disabled={!formik.isValid}>Place Request</button>
                                        </Form>
                        }
                    }
                </Formik>
            </div>
            {(modalState.visibility&&modalState.modalType==='alert')?
                <ModalControler modalVisiblity={modalState.visibility} modalType='alert' title='Request placed !!!' sentData={fetchedData} redirectTo='/handyman/services'/>:null}
            
        </div>
    );
}
 
export default RequestFormFC;