import React from 'react';
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl';

const btnClass="inline-block px-6 py-2.5 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"
const countries = [
    {key:'Select country',value: ''},
    {key:'Nepal',value: 'nepal'},
    {key:'India',value: 'india'},
    {key:'China',value: 'china'},
]
const gender = [
    {key:'Male',value: 'male'},
    {key:'Female',value: 'female'},
]
const services = [
    {key:'Carpenter',value: 'carpenter'},
    {key:'Maison',value: 'maison'},
    {key:'Electrician',value: 'electrician'},
]

const FormikContainer = () => {
    const initialValues={
        email:'',
        comments:'',
        selectCountries:'',
        gender:'',
        services:[],
        dob:null,
    }
    const validationSchema=Yup.object({
        email: Yup.string().email().required().label('Email'),
        comments: Yup.string().required().label('Comments'),
        selectCountries: Yup.string().required().label('Select countries'),
        gender: Yup.string().required().label('Gender'),
        services: Yup.array().required().label('Services'),
        dob: Yup.date().required().nullable().label('Services'),
        
    })
    const onSubmit=(values, propsOnSubmit)=>{
        console.log('Form Data', values)
        propsOnSubmit.resetForm()
        
    }
    return ( 
        <Formik
            initialValues= {initialValues}
            validationSchema= {validationSchema}
            onSubmit = {onSubmit}
        > 
            {
                formik=>
                    <Form>
                        <FormikControl
                            control = 'input'
                            label = 'Email'
                            name = 'email'
                        />
                        <FormikControl
                            control = 'textarea'
                            label = 'Comments'
                            name = 'comments'
                        />
                        <FormikControl
                            control = 'select'
                            label = 'Select countries'
                            name = 'selectCountries'
                            options = {countries}
                        />
                        <FormikControl
                            control = 'radio'
                            label = 'Gender'
                            name = 'gender'
                            options = {gender}
                        />
                        <FormikControl
                            control = 'checkbox'
                            label = 'Services'
                            name = 'services'
                            options = {services }
                        />
                        <FormikControl
                            control = 'checkbox'
                            label = 'Services'
                            name = 'services'
                            options = {services }
                        />
                        <FormikControl
                            control = 'date'
                            label = 'Date of birth'
                            name = 'date'
                        />
                        <button type='submit' className={btnClass}>Submit</button>
                    </Form>
                
            }
        </Formik>
     );
}
 
export default FormikContainer;