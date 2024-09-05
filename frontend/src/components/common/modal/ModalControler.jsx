import React from 'react';
import { useState } from 'react';
import AlertModal from './AlertModal';
import ConfirmationModal from './ConfirmationModal';
import FormModal from './FormModal';
import FormModalPasswordReset from './FormModalPasswordReset';
import DeclineFormModal from './DeclineFormModal';

const ModalControler = (props) => {
    const {modalType, title, modalVisiblity, sentData: sendDataToForm, redirectTo, options} =  props
    const [visiblity, setVisiblity] = useState(modalVisiblity);

        const closeModal=()=>{
            setVisiblity(false);
        }
        // console.log('From Modal Controler', options)
        const takeAction=(obj)=>{
            if (obj.modal==='confirmation' || obj.modal==='alert' || obj.modal==='form_modal' || obj.modal === 'form_modal_pwd_reset' || obj.modal === 'decline_form_modal'){
                sendDataToForm(obj);
                setVisiblity(false);
            }
            // if (obj.modal==='password'){
            //     // useField('password', fetchedData['password'])
            //     // console.log(values);
            //     setDisplay({passwordModal:false});
            //     console.log("Action On Password Form", obj.modal);
            //     }
            // if (obj.modal==='mobile'){
            //     // setFValues({...values, 'mobile':fetchedData['mobile']})
            //     // console.log("After Mobile Update",values);
            //     setDisplay({numberModal:false});
            //     console.log("Action On Mobile Form", obj.modal)
            // }
            // if (obj.modal==='address'){
            //     // setFValues({...values, 'province':fetchedData['province'],
            //                             //  s
            //     // console.log(values);
            //     setDisplay({addressModal:false});
            //     console.log("Action On Address Form", obj.modal)
            // }
        }
    // console.log('Visiblity',modalVisiblity)
    switch (modalType){
        case 'alert':
            return (<div>
                        {visiblity?<AlertModal closeModal={closeModal} onYes={takeAction} title={title} redirectTo={redirectTo}/>: null}
                    </div>);
        case 'confirmation':
            return (<div>
                        {visiblity?<ConfirmationModal closeModal={closeModal} onYes={takeAction} title={title} redirectTo={redirectTo}/>: null}
                    </div>);
        case 'form_modal':
            return (<div>
                        {visiblity?<FormModal closeModal={closeModal} onYes={takeAction} title={title} redirectTo={redirectTo}/>: null}
                    </div>);
        case 'decline_form_modal':
            return (<div>
                        {visiblity?<DeclineFormModal closeModal={closeModal} onYes={takeAction} title={title} reasonOptions={options} redirectTo={redirectTo}/>: null}
                    </div>);
        case 'form_modal_pwd_reset':
            return (<div>
                        {visiblity?<FormModalPasswordReset closeModal={closeModal} onYes={takeAction} title={title} redirectTo={redirectTo}/>: null}
                    </div>);
        // case 'textarea':
        //     return (<TextAreaFC {...rest}></TextAreaFC>);
        // case 'radio': return (<RadioFC {...rest}></RadioFC>)
        // case 'checkbox': return (<CheckBoxFC {...rest}></CheckBoxFC>)
        // case 'select': return (<SelectFC {...rest}></SelectFC>)
        // case 'date': return(<DatePickerFC {...rest}></DatePickerFC>)
        default: return null;
    }
}
 
export default ModalControler;