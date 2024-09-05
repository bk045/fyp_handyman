import React, {useEffect, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import RequestCard from './cards/RequestCard';
import {toast} from 'react-toastify'
import ModalControler from './modal/ModalControler';
import { UserContext } from '../../services/contextService';
import * as requestService from '../../services/requestService'


const RequestLists = ({data}) => {
    const {user, setUser} = useContext(UserContext)
    const redirectTo = useNavigate();

    const [activeReqId, setActiveReqId] = useState(null);

    const [acceptModal, setAcceptModal] = useState({
        visibility:false,
        modalType:"",
    });
    const [declineModal, setDeclineModal] = useState({
        visibility:false,
        modalType:"",
    });
    
    const [completeModal, setCompleteModal] = useState({
        visibility:false,
        modalType:"",
    });

    const [reasonList, setReasonList] = useState([])

    useEffect(()=>{
        requestService.getDeclineReasons().then(response=>{
            const {data} = response;
            setReasonList(data)
        })
    },[])

    const getReasonOptions = (reasonList)=>{
        let reasonOptions = [{'key':'Select reason...', 'value':""}]
        for (let reason of reasonList){
            reasonOptions = [...reasonOptions, {'key':reason.reason, 'value':reason.reason_id}]
        } 
        return reasonOptions
    }
    const confirmAcceptance=(obj)=>{
        if (obj.response==='positive'){
            setAcceptModal({visibility: false})
            requestService.acceptRequest(activeReqId, {
                "request": activeReqId,
                "closed_date_time": null,
                "agreed_cost": obj.data.cost,
                "req_status": "Open",
                "user_feedback": ""
            })
            redirectTo('/handyman/request/list')
            toast.success('Request Accepted!!!')
        }
        else{
            setAcceptModal({visibility: false})
        }
    }
    const confirmDecline=(obj)=>{
        if (obj.response==='positive'){
            setDeclineModal({visibility: false})
            const {reason} = obj.data
            console.log(reason)
            requestService.declineRequest(activeReqId, {
                "request": activeReqId,
                "user_type": user.info.user_type,
                "date_time":null,
                "user_id": user.info.id,
                "reason": reason,
            })
            redirectTo('/handyman/request/list')
            toast.info('Request Declined!!!')
            
        }
        else{
            setDeclineModal({visibility: false})
        }
    }
    const confirmComplete=(obj)=>{
        if (obj.response==='positive'){
            setCompleteModal({visibility: false})
            requestService.completeRequest(activeReqId, {})
            redirectTo('/handyman/request/list')
            toast.info('Request Completed!!!')
            
        }
        else{
            setCompleteModal({visibility: false})
        }
    }

    const handleAccept=(reqId)=>{
        setAcceptModal({visibility: true, modalType:"form_modal"})
        setActiveReqId(reqId)
    }
    const handleComplete=(reqId)=>{
        console.log(reqId)
        setCompleteModal({visibility: true, modalType:"confirmation"})
        setActiveReqId(reqId)
    }
    const handleChat=(reqObj)=>{
        redirectTo("http://127.0.0.1:8000/admin/")
    }
    const handleFeedback=(reqId)=>{
        redirectTo('/handyman/request/feedback/', {state:{reqId, user}});
        
    }
    const handleDecline=(reqId)=>{
        setDeclineModal({visibility: true, modalType:"decline_form_modal"})
        setActiveReqId(reqId)
    }

    return (
        <div className='request-card-container'>
                {data.map(item => <div key={item.id}>
                    <RequestCard data={item} 
                    req_date_time={item.req_date_time}
                    req_status={item.req_status}
                    client={item.client}
                    caterer={item.caterer}
                    caterer_id={item.caterer_id}
                    req_service={item.req_service}
                    city={item.city}
                    area={item.area}
                    proposed_date_time={item.proposed_date_time}
                    description={item.description}
                    initiateDecline={()=>handleDecline(item.id)}
                    initiateComplete={()=>handleComplete(item.id)}
                    initiateChat={()=>handleChat(item)}
                    initiateAccept={()=>handleAccept(item.id)}
                    giveFeedBack = {()=>handleFeedback(item.id)}
                    />
                    </div>)}
        {(acceptModal.visibility&&acceptModal.modalType==='form_modal')?
                <ModalControler modalVisiblity={acceptModal.visibility} modalType='form_modal' title='Accept Details' sentData={confirmAcceptance} redirectTo='/handyman/request/list'/>:null}
        {(declineModal.visibility&&declineModal.modalType==='decline_form_modal')?
                <ModalControler modalVisiblity={declineModal.visibility} modalType='decline_form_modal' title='Decline Reason' options={getReasonOptions(reasonList)} sentData={confirmDecline} redirectTo='/handyman/request/list'/>:null}
        {(completeModal.visibility&&completeModal.modalType==='confirmation')?
                <ModalControler modalVisiblity={completeModal.visibility} modalType='confirmation' title='Has the request been completed?' sentData={confirmComplete} redirectTo='/handyman/request/list'/>:null}
        </div>
    );
}
 
export default RequestLists;