import React, {useState, useEffect} from "react";
import PieChart from "../common/PieChart";
import BarChart from "../common/BarChart";
import * as requestService from '../../services/requestService' 

const Dashboard = () => {
    const [acceptedReq, setAcceptedReq] = useState(0)
    const [declinedReq, setDeclinedReq] = useState(0)
    const [placedReq, setPlacedReq] = useState(0)
    const [completedReq, setCompletedReq] = useState(0)
    
    const [activeUsers, setActiveUsers] = useState(0)
    const [blockedUsers, setBlockedUsers] = useState(0)
    const [deletedUsers, setDeletedUsers] = useState(0)
    
    const [activeBCustomer, setBCusotmer] = useState(0)
    const [activeBCaterer, setBCaterer] = useState(0)
    const [activeICustomer, setICusotmer] = useState(0)
    const [activeICaterer, setICaterer] = useState(0)
    
    
    useEffect(()=>{
        requestService.getAcceptedRequestCount().then(response =>{
            const {data} = response;
            setAcceptedReq(data.accepted_req_count)
        });
    },[])
    useEffect(()=>{
        requestService.getCancelledRequestCount().then(response =>{
            const {data} = response;
            setDeclinedReq(data.cancelled_req_count)
        });
    },[])
    useEffect(()=>{
        requestService.getCompletedRequestCount().then(response =>{
            const {data} = response;
            setCompletedReq(data.completed_req_count)
        });
    },[])
    useEffect(()=>{
        requestService.getPlacedRequestCount().then(response =>{
            const {data} = response;
            setPlacedReq(data.placed_req_count)
        });
    },[])

    useEffect(()=>{
        requestService.getActiveUserCount().then(response =>{
            const {data} = response;
            setActiveUsers(data.active_user_count)
        });
    },[])

    useEffect(()=>{
        requestService.getDeletedUserCount().then(response =>{
            const {data} = response;
            setDeletedUsers(data.deleted_user_count)
        });
    },[])
    useEffect(()=>{
        requestService.getBlockedUserCount().then(response =>{
            const {data} = response;
            setBlockedUsers(data.blocked_user_count)
        });
    },[])
    useEffect(()=>{
        requestService.getActiveICustomerCount().then(response =>{
            const {data} = response;
            setICusotmer(data.active_i_customer_count)
        });
    },[])
    useEffect(()=>{
        requestService.getActiveICatererCount().then(response =>{
            const {data} = response;
            setICaterer(data.active_i_caterer_count)
        });
    },[])
    useEffect(()=>{
        requestService.getActiveBCustomerCount().then(response =>{
            const {data} = response;
            setBCusotmer(data.active_b_customer_count)
        });
    },[])
    useEffect(()=>{
        requestService.getActiveBCatererCount().then(response =>{
            const {data} = response;
            setBCaterer(data.active_b_caterer_count)
        });
    },[])
    

    const BarData = [[activeBCustomer, activeICustomer], [activeBCaterer, activeICaterer]]
    const BarBottomLabels = ['Business User', 'Individual User']
    const BarTopLabels = ['Customer', 'Caterer']
    const BarColor = ['orangered', 'purple']
    const BarBorderColor = 'black'
    const BarBorderWidth = '1'

    const PieUserData = [deletedUsers, blockedUsers, activeUsers]
    const PieUserLabels = ['Deleted', 'Blocked', 'Active']
    const PieUserColor = ['aqua', 'orangered', 'purple']
    
    const PieReqColor = ['aqua', 'orangered']
    const PieReqData = [declinedReq, completedReq]
    const PieReqLabels = ['Declined', 'Completed']
    
    return ( <div className="dashboard-container">
                <h3 className="title">Dashboard</h3>
                <div className="top-row">
                    <div className="number-box active-box">
                        <div className="label">Accepted Requests</div>
                        <div className="value">{acceptedReq}</div>
                    </div>
                    <div className="number-box cancelled-box">
                        <div className="label">Cancelled Requests</div>
                        <div className="value">{declinedReq}</div>
                    </div>
                    <div className="number-box completed-box">
                        <div className="label">Completed Requests</div>
                        <div className="value">{completedReq}</div>
                    </div>
                    <div className="number-box placed-box">
                        <div className="label">Placed Requests</div>
                        <div className="value">{placedReq}</div>
                    </div>
                </div>
                <div className="bottom-row">
                    <div className="figure pie-box"><PieChart labelsList={PieUserLabels} dataList={PieUserData} colorList={PieUserColor} title='Deleted Vs Blocked Vs Active Users'/></div>
                    <div className="figure bar-box"><BarChart bottomLabelList={BarBottomLabels} topLabelList={BarTopLabels} dataList={BarData} borderColor={BarBorderColor} borderWidth={BarBorderWidth} colorList={BarColor} title={"Users"}/></div>
                    <div className="figure pie-box"><PieChart labelsList={PieReqLabels} dataList={PieReqData} colorList={PieReqColor} title='Declined Vs Completed Requests'/></div>
                </div>
    </div> );
}
 
export default Dashboard;