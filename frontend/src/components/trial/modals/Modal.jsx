import React from 'react';
import {useEffect} from 'react';
import ReactDOM from 'react-dom';


const Modal = ({closeModal}) => {
    useEffect(()=>{
        document.body.style.overflowY="hidden";
        return()=>{
            document.body.style.overflowY="scroll";
        };
    }, []);
    return ReactDOM.createPortal( <div>
        <div className='modal-wrapper' onClick={closeModal}></div>
        <div className="modal-container">
            <h3>My Modal</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit voluptate libero repudiandae ullam exercitationem quos itaque. Modi voluptate rerum perspiciatis! Vero obcaecati consequuntur repellendus architecto aliquid vel adipisci fugit soluta.
            Esse et rerum veritatis optio tempore totam voluptatibus adipisci molestiae, fugiat repellendus nostrum sunt natus, ipsa aut iste eligendi! Consequatur eligendi voluptatem explicabo! Voluptas numquam pariatur excepturi nisi! Eius, reiciendis.
            Qui nesciunt error architecto non laborum praesentium laudantium beatae blanditiis dolore saepe aspernatur corporis alias veritatis, ut sequi aliquam debitis iste labore natus dolorem illo harum totam consequatur! Neque, illum.
            </p>
            <button onClick={closeModal} className="mybtn mybtn-sm mybtn--outline--primary">Hide it</button>
        </div>
    </div>, document.querySelector("#modalSection") );
}
 
export default Modal;