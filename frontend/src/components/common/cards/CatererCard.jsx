import React, {useContext} from 'react';
import {FaTasks, FaBuilding, FaStar} from 'react-icons/fa'
import {ImLocation2} from 'react-icons/im'
import { UserContext } from '../../../services/contextService';
import Star from '../Star';

const CatererCard = ({name, location, taskCompleted, avg_rating, type, services, processRequest, profile_picture}) => {
    const {user} = useContext(UserContext)
    const{info, profile} = user
    return ( 
        <>
            <div className="caterer-profile-card">
                <div className="card-header">
                <a href={profile_picture}><div className="pic">
                    <img src={profile_picture}/>
                    </div></a>
                    <div className="name">{name}</div>
                    <div className="desc">{services}</div>
                    <div className="rating flex justify-center">
                        <Star stars={avg_rating}/>
                    </div>
                    <div className="req-btn">
                        <div className="mybtn mybtn-sm mybtn--outline--primary" onClick={processRequest}>Make Request</div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="info">
                        <div className="item">
                            <ImLocation2/><div>{location}</div>
                        </div>
                        <div className="item">
                            <FaTasks/><div>{taskCompleted + ' Tasks'}</div>
                        </div>
                        <div className="item">
                            <FaBuilding/><div>{type}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default CatererCard;