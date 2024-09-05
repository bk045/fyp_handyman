import React from 'react';
import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';



const ConfirmationModal = ({closeModal, onYes, title, redirectTo}) => {
    useEffect(()=>{
        document.body.style.overflowY="hidden";
        return()=>{
            document.body.style.overflowY="scroll";
        };
    }, []);
    // Later use
    const takeAction=(response)=>{
        if (response===1){
            onYes({modal:'confirmation',
            response: 'positive'})
        }
        else{
            onYes({modal:'confirmation',
            response: 'negative'})
        }
    };
    return ReactDOM.createPortal( <div>
        <div className='modal-wrapper'></div>
        <div className="modal-container">
            <h3 className='text-center'>{title}</h3>
            <div className='flex justify-center'>
            <NavLink to={redirectTo}>
                <button onClick={()=>takeAction(1)} className="mybtn mybtn-sm mybtn--outline--primary mx-10">Yes</button>
            </NavLink>
                <button onClick={()=>takeAction(0)} className="mybtn mybtn-sm mybtn--outline--secondary">No</button>
            </div>
        </div>
    </div>, document.querySelector("#modalSection") );
}
 
export default ConfirmationModal;