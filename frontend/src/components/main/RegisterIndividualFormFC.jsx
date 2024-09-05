import React from 'react';
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import FormikControl from '../forms/FormikControl';
import axios from 'axios';

const userEndPoint = 'http://127.0.0.1:8000/handyman/auth/users/'

const btnClass="inline-block px-6 py-2.5 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"

const userTypeOptions = [
    {key:'Customer', value:'individual'},
    {key:'Service Provider', value:'individual caterer'},
]

const RegisterIndividualUserFC = () => {
    const initialValues = {
        email:'',
        password:'',
        cpassword:'',
        user_type:'',
        profile_status:'',
    }
    const validationSchema = Yup.object({
        email: Yup.string().email().required().label('Email'),
        password:Yup.string().required().label('Password'),
        cpassword:Yup.string().required().oneOf([Yup.ref('password'), null]).label('Confirm Password'),
        user_type:Yup.string().required().label('What are you?'),
    })

    const mapData = (userDetails)=>{
        const profile_status = userDetails.user_type === 'individual'?'active':'pending'
        const user={
            email:userDetails.email,
            password:userDetails.password,
            user_type: userDetails.user_type,
            profile_status,
        }
        return user
    }
    const onSubmit = async (values, propsOnSubmit) =>{
        const user = mapData(values);
        const {data:post} = await axios.post(userEndPoint, user)
        console.log(post);
        propsOnSubmit.resetForm();
    }
    
    return (
        <div>
            <h2>Login Form</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnMount
            >
                {
                    formik=> {
                        // console.log('Formik', formik)
                            return <Form>
                                        <FormikControl control='input' type='email' name='email' label='Email'/>
                                        <FormikControl control='passwordCombo'/>
                                        <FormikControl control='radio' name='user_type' label='Who are you?' options={userTypeOptions}/>
                                        <button type='submit' className={btnClass} disabled={!formik.isValid}>Register</button>
                                    </Form>
                    }
                }
            </Formik>
        </div>
    );
}
 
export default RegisterIndividualUserFC;