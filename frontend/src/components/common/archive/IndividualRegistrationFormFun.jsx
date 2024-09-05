import React, {useState} from 'react';
import InputField from './InputField'
import axios from 'axios';
import ConfirmationModal from '../modal/ConfirmationModal';
import FormModal from '../modal/FormModal';
import PasswordUpdateComponent from './PasswordUpdateComponent';
import MobileUpdateComponent from './MobileUpdateComponent';
import AddressUpdateComponent from './AddressUpdateComponent';
import {useFormik, useField, setFieldValue} from 'formik';
import { formSchema } from '../../../schema';

const individualUEndPoint = 'http://127.0.0.1:8000/handyman/api/individuals/'

const initialValues = {
    name:"", 
    email:"", 
    mobile:"", 
    password:"",
    cpassword:"",
    gender:"", 
    province:"", 
    city:"", 
    area:""
}

const IndividualRegistrationFormFun=(props)=>{

   const [fvalues, setFValues] = useState({ 
                                        id:"",
                                        first_name:"", 
                                        middle_name:"", 
                                        last_name:"", 
                                        email:"", 
                                        mobile:"", 
                                        password:"",
                                        gender:"", 
                                        province:"", 
                                        city:"", 
                                        area:"",
                                        // role:"",
                                    });
    const [showModal, setShowModal] = useState({
                                    currentModal:"",
                                    confirmModal: false,
                                    addressModal: false,
                                    numberModal: false,
                                    passwordModal: false,
                                    });
    const [fetchedData, setFetchedData] = useState({});

    const {values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit : (values) =>{
            // console.log(errors)
        }
    })
    // console.log(errors)
    const inputs = [
        {
            name: 'id',
            label: "ID",
            type: "text",
            readonly: false,
            // placeholder:
        },
        {
            name: 'first_name',
            label: "First Name",
            type: "text",
            readonly: false,
        },
        {
            name: 'middle_name',
            label: "Middle Name",
            type: "text",
            readonly: false,
        },
        {
            name: 'last_name',
            label: "Last Name",
            type: "text",
            readonly: false,
        },
        {
            name: 'gender',
            label: "Gender",
            type: "text",
            readonly: false,
        },
        {
            name: 'email',
            label: "Email",
            type: "text",
            readonly: false,
        },
        {
            name: 'mobile',
            label: "Mobile Number",
            type: "text",
            readonly: false,
        },
        {
            name: 'password',
            label: "Password",
            type: "text",
            readonly: false,
        },
        {
            name: 'province',
            label: "Province",
            type: "text",
            readonly: false,
        },
        {
            name: 'city',
            label: "City",
            type: "text",
            readonly: false,
        },
        {
            name: 'area',
            label: "Area",
            type: "text",
            readonly: false,
        },
    ]
    
    // const handleChange=(e)=>{
    //     e.preventDefault();
    //     setValues({...values, [e.target.name]: e.target.value});
    // }

    // const handleSubmit=(e)=>{
    //     e.preventDefault();
    //     // setShowModal(true)
    // }
    const closeModal=()=>{
        setShowModal({confirmModal: false});
    }

    const takeAction=(obj)=>{
        if (obj.modal==='confirm'){
            setShowModal({confirmModal:false});
        }
        if (obj.modal==='password'){
            // useField('password', fetchedData['password'])
            console.log(values);
            setShowModal({passwordModal:false});
            console.log("Action On Password Form", obj.modal);
            }
        if (obj.modal==='mobile'){
            setFValues({...values, 'mobile':fetchedData['mobile']})
            console.log("After Mobile Update",values);
            setShowModal({numberModal:false});
            console.log("Action On Mobile Form", obj.modal)
        }
        if (obj.modal==='address'){
            setFValues({...values, 'province':fetchedData['province'],
                                    'city':fetchedData['city'],
                                    'area':fetchedData['area']})
            console.log(values);
            setShowModal({addressModal:false});
            console.log("Action On Address Form", obj.modal)
        }
    }

    const getData=(obj)=>{
        setFetchedData(obj);
    }

    const btnClass="inline-block px-6 py-2.5 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"

    return ( <div>
        <form onSubmit={handleSubmit}>
            {inputs.map(input=><div key={input.name} className='flex items-center'>
                <InputField
                     {...input}
                    // value={f_values[input.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {input.name === "password" ?<button onClick={()=>setShowModal({passwordModal:true})} className={btnClass}>Reset Password</button>:
                input.name === "mobile" ?<button onClick={()=>setShowModal({numberModal:true})} className={btnClass}>Change Number</button>:
                input.name === "area"?<button onClick={()=>setShowModal({addressModal:true})} className={btnClass}>Change Address</button>:null}
            </div>)}
        </form>
        <button onClick={()=>setShowModal({confirmModal:true})} className={btnClass}>Update</button>
        {showModal.confirmModal && <ConfirmationModal closeModal={closeModal} onYes={takeAction} action={"update"}/>}
        {showModal.addressModal && <FormModal closeModal={closeModal} onYes={takeAction} title={"Change Address - Form Modal"} formComponent={<AddressUpdateComponent passedValues={getData} sentValues={values}/>} name="address"/>}
        {showModal.numberModal && <FormModal closeModal={closeModal} onYes={takeAction} title={"Change Mobile Number - Form Modal"} formComponent={<MobileUpdateComponent passedValues={getData} sentValues={values}/>} name="mobile"/>}
        {showModal.passwordModal && <FormModal closeModal={closeModal} onYes={takeAction} title={"Change Password - Form Modal"} formComponent={<PasswordUpdateComponent passedValues={getData} sentValues={values}/>} name="password"/>}
    </div>
    );
}
export default IndividualRegistrationFormFun;