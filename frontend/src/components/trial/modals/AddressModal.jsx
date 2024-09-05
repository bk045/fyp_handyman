import React, { useState } from "react";
import Modal from "./Modal";


const AddressModal = (props) => {
    const [showModal, setShowModal] = useState(false)

    const closeModal=()=>setShowModal(false);
    
    return ( <div>
        <h1>Main Page</h1>
        <button onClick={()=>setShowModal(true)}>Show</button>
        {showModal && <Modal closeModal = {closeModal}/>}
    </div> );
}
 
export default AddressModal;