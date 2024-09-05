import React, {useContext} from 'react';
import { getMinutes, getMonth, getSeconds, getYear } from 'date-fns';
import { UserContext } from '../../../services/contextService';


const btnClass="inline-block px-6 py-2.5 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"

const RequestCard = ({initiateAccept, initiateDecline, initiateComplete, initiateChat, giveFeedBack,req_date_time, req_status, client, caterer, caterer_id, req_service, city, area, proposed_date_time, description}) => {
    // const {} = data
    const {user} = useContext(UserContext);
    const {info, profile} = user
    // console.log('Req date', data.req_status)
    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const getDateTime = (isoDate)=>{
        if(isoDate){
            const dt = new Date(isoDate);
            const date = dt.toISOString().substring(0, 10);
            let day = weekday[dt.getDay()];
            let hour = dt.getHours();
            let min = dt.getMinutes();
            let sec = dt.getSeconds();
            const fullDate = date + " " +day+" "+hour+":"+min+":"+sec
            return fullDate
        }
    }
    return ( 
            <div className="request-card-wrapper">
                <div className="rcard-header">
                    <div className="label">Requested Date:<span>{getDateTime(req_date_time)}</span></div>
                    <div className="label">Status:<span>{req_status}</span></div>
                </div>
                <div className="rcard-body">
                <div className="label">Client:<span>{client}</span></div>
                <div className="label">Service Provider:<span>{caterer}</span></div>
                <div className="label">Requested Service:<span>{req_service}</span></div>
                <div className="label">City:<span>{city}</span></div>
                <div className="label">Area:<span>{area}</span></div>
                <div className="label">Proposed Date Time:<span>{getDateTime(proposed_date_time)}</span></div>
                <div className="label">Description:<span>{description}</span></div>
                </div>
                <div className="rcard-footer">
                    {((info.user_type === 'i-caterer' || info.user_type === 'b-caterer') && (req_status ==='Placed'))&&<button className={btnClass} onClick={initiateAccept}>Accept</button>}
                    {((req_status ==='Accepted'))&&<button className={btnClass} onClick={initiateComplete}>Completed</button>}
                    
                    {(info.user_type === 'i-customer' || info.user_type === 'b-customer') && (req_status=='Placed' || req_status=='Accepted')?
                    <button className={btnClass} onClick={initiateDecline}>{(info.user_type === 'i-caterer' || info.user_type === 'b-caterer')?'Decline':'Cancel'}</button>:
                    ((info.user_type === 'i-caterer' || info.user_type === 'b-caterer') && (req_status == 'Placed'))?
                    <button className={btnClass} onClick={initiateDecline}>{(info.user_type === 'i-caterer' || info.user_type === 'b-caterer')?'Decline':'Cancel'}</button>:null}
                    
                    {((info.user_type === 'i-customer' || info.user_type === 'b-customer') && (req_status == 'Completed')) && <button className={btnClass} onClick={giveFeedBack}>Feedback & Rate</button>}
                    
                    {((req_status=='Placed') || (req_status=='Accepted'))&&<a className={btnClass} onClick={initiateChat} href={`http://127.0.0.1:8000/chat/room/${user.info.id}/${caterer_id}`} target='_blank'>Chat</a>}
                </div>
            </div>
     );
}
 
export default RequestCard;