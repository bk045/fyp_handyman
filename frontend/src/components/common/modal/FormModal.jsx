import React, { useState } from 'react';
import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Form, Formik} from 'formik';
import * as Yup from 'yup'
import FormikControl from '../forms/FormikControl';

const inputClass = "form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-2 disabled:text-gray-400 focus:text-gray-700 focus:bg-white focus:-border--color-primary focus:outline-none"

const FormModal = ({closeModal, onYes, title, redirectTo}) => {
    const [cost, setCost] = useState(null)
    
    useEffect(()=>{
        document.body.style.overflowY="hidden";
        return()=>{
            document.body.style.overflowY="scroll";
        };
    }, []);

    // Later use
    const takeAction=(response, cost)=>{
        if (response === 'negative'){
            onYes({modal:"form_modal", response:'negative', data:{}})
        }
        else{
            onYes({modal:"form_modal", response:'positive', data:{cost}})
        }
    };

    const handleChange=(e)=>{
        console.log(e.target.value);
    }
    
    const initialValues = {
        agreed_cost:""
    }

    const validationSchema = Yup.object({
        agreed_cost:Yup.number().required().label('Agreed Cost'),
    })

    const onSubmit=(values)=>{
        takeAction('positive', values.agreed_cost)
    }

    
    return ReactDOM.createPortal( <div>
        <div className='modal-wrapper' onClick={closeModal}></div>
        <div className="modal-container">
            <h3 className='text-center'>{title}</h3>
            <div>
            <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {
                        formik=> {
                                return <Form>
                                        <FormikControl className={inputClass} control='input' type='text' name='agreed_cost' label='Agreed Cost'/>
                                <div className='flex justify-center'>
                                    <button type='submit' className="mybtn mybtn-sm mybtn--outline--primary mx-10">Submit</button>
                                    <button onClick={()=>takeAction('negative')} className="mybtn mybtn-sm mybtn--outline--primary mx-10">Cancel</button>
                                </div>
                                </Form>
                        }
                    }
                </Formik>
            </div>
        </div>
    </div>, document.querySelector("#modalSection") );
}
 
export default FormModal;