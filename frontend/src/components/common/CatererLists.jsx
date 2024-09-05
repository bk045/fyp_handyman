import React, {Component, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
// import CatererCard from '../cards/CatererCard';
import CatererCard from './cards/CatererCard'
import {toast} from 'react-toastify'
import ModalControler from './modal/ModalControler';
import { UserContext } from '../../services/contextService';
import { useLocation } from 'react-router-dom';
import * as requestService from '../../services/requestService'
import { getErrorMessage } from '../../services/errorMessageService';



const CatererLists = ({data}) => {
    const {user, setUser} = useContext(UserContext)
    // const{info, profile} = user
    const redirectTo = useNavigate();

    const [modalState, setModalState] = useState({
        visibility:false,
        modalType:"",
    });

    // console.log('Form Carosoul', location.state.service)
    const fetchedData=(obj)=>{
        if (obj.response==='positive'){
            setModalState({visibility: false})
        }
    }

    const toRequestForm=(caterer_id)=>{
        redirectTo("/handyman/request",
        {state:{caterer_id}});
    };

    const handleRequest = (id)=>{
        if (!user.info.email){
            redirectTo("/handyman/login")
            toast.error("Login required!!!")
        }
        else if(user.info.user_type === 'i-caterer' || user.info.user_type === 'b-caterer'){
            setModalState({visibility: true, modalType:"alert"})
        }
        else{
            console.log('caterer id', id)
            toRequestForm(id)
        }
    }
    
    return (
        <div className='caterer-card-container'>
                {data.map(item => <div key={item.id} className="mr-4 mb-4">
                    <CatererCard
                    name={item.name}
                    services={item.services}
                    profile_picture={item.profile_picture}
                    location={item.area}
                    taskCompleted={item.completed_task}
                    avg_rating={item.avg_rating}
                    type={item.caterer}
                    processRequest = {()=>handleRequest(item.user_id)}
                    /></div>)}
        {(modalState.visibility&&modalState.modalType==='alert')?
                <ModalControler modalVisiblity={modalState.visibility} modalType='alert' title='Service Provider cannot make request!!!' sentData={fetchedData} redirectTo='/handyman/services/list'/>:null}
        </div>
    );
}
 
export default CatererLists;