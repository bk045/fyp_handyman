import React from 'react';
import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';


const AlertModal = ({closeModal, onYes, title, redirectTo}) => {
    useEffect(()=>{
        document.body.style.overflowY="hidden";
        return()=>{
            document.body.style.overflowY="scroll";
        };
    }, []);
    // Later use
    const takeAction=()=>{
        onYes({modal:'alert',
            response: 'positive',})
    };
    return ReactDOM.createPortal( <div>
        onClick={takeAction}
        <div className='modal-wrapper'></div>
        <div className="modal-container">
            <h3 className='text-center'>{title}</h3>
            <div className='flex justify-center'>
                <NavLink to={redirectTo}>
                    <button onClick={takeAction} className="mybtn mybtn-sm mybtn--outline--primary mx-10">OK</button>
                </NavLink>
                {/* <button onClick={closeModal} className="mybtn mybtn-sm mybtn--outline--secondary">No</button> */}
            </div>
        </div>
    </div>, document.querySelector("#modalSection") );
}
 
export default AlertModal;