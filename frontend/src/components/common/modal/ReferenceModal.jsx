import React, { useState } from 'react';
import {useEffect} from 'react';
import ReactDOM from 'react-dom';


const ConfirmationModal = ({closeModal, onSubmit}) => {
    const [name, setName] = useState("")
    useEffect(()=>{
        document.body.style.overflowY="hidden";
        return()=>{
            document.body.style.overflowY="scroll";
        };
    }, []);
    const updateItem=()=>{
        onSubmit({name})
    };
    const handleChange=(e)=>{
        e.preventDefault();
        setName(e.target.value);
    };
    console.log(name);
    return ReactDOM.createPortal( <div>
        <div className='modal-wrapper' onClick={closeModal}></div>
        <div className="modal-container">
            <h3 className='text-center'>Are you sure you want to update?</h3>
            {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit voluptate libero repudiandae ullam exercitationem quos itaque. Modi voluptate rerum perspiciatis! Vero obcaecati consequuntur repellendus architecto aliquid vel adipisci fugit soluta.
            Esse et rerum veritatis optio tempore totam voluptatibus adipisci molestiae, fugiat repellendus nostrum sunt natus, ipsa aut iste eligendi! Consequatur eligendi voluptatem explicabo! Voluptas numquam pariatur excepturi nisi! Eius, reiciendis.
            Qui nesciunt error architecto non laborum praesentium laudantium beatae blanditiis dolore saepe aspernatur corporis alias veritatis, ut sequi aliquam debitis iste labore natus dolorem illo harum totam consequatur! Neque, illum.
            </p> */}
            <input name='name' placeholder='Enter name' onChange={handleChange}></input>
            <div className='flex justify-center'>
                <button onClick={updateItem} className="mybtn mybtn-sm mybtn--outline--primary mx-10">Yes</button>
                <button onClick={closeModal} className="mybtn mybtn-sm mybtn--outline--secondary">No</button>
            </div>
        </div>
    </div>, document.querySelector("#modalSection") );
}
 
export default ConfirmationModal;