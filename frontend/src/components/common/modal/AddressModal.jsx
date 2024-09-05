import React, { useState } from 'react';
import {useEffect} from 'react';
import ReactDOM from 'react-dom';


const AddressModal = ({closeModal, onYes, title, name}) => {
    useEffect(()=>{
        document.body.style.overflowY="hidden";
        return()=>{
            document.body.style.overflowY="scroll";
        };
    }, []);
    // Later use
    const takeAction=()=>{
        onYes({modal: name})
    };
    return ReactDOM.createPortal( <div>
        <div className='modal-wrapper'></div>
        <div className="modal-container">
            <h3 className='text-center'>{title}</h3>
            <div className='flex justify-center'>
                <button onClick={takeAction} className="mybtn mybtn-sm mybtn--outline--primary mx-10">Yes</button>
                <button onClick={closeModal} className="mybtn mybtn-sm mybtn--outline--secondary">No</button>
            </div>
        </div>
    </div>, document.querySelector("#modalSection") );
}
 
export default AddressModal;