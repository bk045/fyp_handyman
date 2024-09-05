import React from 'react';
import {FaTools, FaTasks, FaBuilding} from 'react-icons/fa'
import {ImLocation2} from 'react-icons/im'
import {GoPerson} from 'react-icons/go'

const CatererCard = (props) => {
    const {name, job, location, taskCompleted, ratings, type} = props;
    return ( 
    <div className="card-container">
        <div className="caterer-pic">
            <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" className="rounded-circle" alt='Profile Pic'/>
        </div>
        <div>
            <strong>{name}</strong>
        </div>
        <div className="caterer-profile">
            <div className="element-group">
                <div className='mr-4'><FaTools/></div>
                <div className="data">Electrician</div>
                {/* <div className="data">{job}</div> */}
            </div>
            <div className="element-group">
                <div className='mr-4'><ImLocation2/></div>
                <div className="data">{location}</div>
            </div>
            <div className="element-group">
                <div className='mr-4'><FaTasks/></div>
                <div className="data">{taskCompleted}</div>
            </div>
            <div className="element-group">
                <div className='mr-4'>{type==='Individual'?<GoPerson/>:<FaBuilding/>}</div>
                <div className="data">{type}</div>
            </div>
            <div className="element-group">
                <div className='mr-4'><ImLocation2/></div>
                <div className="data">{ratings}</div>
            </div>
        </div>
        <div className="card-button">
            <div className="mybtn mybtn-sm mybtn--outline--secondary">Make Request</div>
        </div>
    </div>
     );
}
 
export default CatererCard;