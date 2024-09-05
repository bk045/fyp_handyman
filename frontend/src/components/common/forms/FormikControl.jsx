import React from 'react';
import CheckBoxFC from './CheckBoxFC';
import DatePickerFC from './DatePickerFC';
import InputFC from './InputFC';
import RadioFC from './RadioFC';
import SelectFC from './SelectFC';
import TextAreaFC from './TextAreaFC';
import PasswordFC from './PasswordFC';
import PasswordComboFC from './PasswordComboFC';
import MultiSelectFC from './MultiSelectFC';

const FormikControl = (props) => {
    const {control, ...rest} =  props
    switch (control){
        case 'input':
            return (<InputFC {...rest}></InputFC>);
        case 'password': return(<PasswordFC {...rest}></PasswordFC>);
        case 'passwordCombo': return(<PasswordComboFC {...rest}></PasswordComboFC>);
        case 'textarea':
            return (<TextAreaFC {...rest}></TextAreaFC>);
        case 'radio': return (<RadioFC {...rest}></RadioFC>)
        case 'checkbox': return (<CheckBoxFC {...rest}></CheckBoxFC>)
        case 'select': return (<SelectFC {...rest}></SelectFC>)
        case 'multi-select': return (<MultiSelectFC {...rest}></MultiSelectFC>)
        case 'date': return(<DatePickerFC {...rest}></DatePickerFC>)
        default: return null;
    }
}
 
export default FormikControl;