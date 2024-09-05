import React, { Component, useState, useEffect } from 'react';
import FilterMenu from '../common/pageItems/FilterMenu';
import RequestsTable from '../common/table/RequestsTable';
import REQUEST_DATA from './reqData.json'
import { getOrderedItems, getFilteredItems } from '../../utils/listManipulation';
import * as requestService from '../../services/requestService'

const RequestReport = () => {
    const [requestsData, setRequestsData] = useState([])
    const [selectedStatus, setSelectedStatus]= useState('All');
    const [statusParams, setStatusParams] = useState(['All', 'Accepted', 'Placed', 'Completed', 'Cancelled'])
    
    useEffect(()=>{
        requestService.getAllRequestsWithName().then(response =>{
            const {data} = response;
            setRequestsData(data)
        });
    },[])


    const handleStatusSelect = (status)=>{
        setSelectedStatus(status)
    }
    
    const getFiltered = (selectedStatus) =>{
        let filtered
        let orderedItems = getOrderedItems(requestsData, ['id'], ['desc']);
        if (selectedStatus !=='All'){
            filtered = getFilteredItems(orderedItems, 'req_status', selectedStatus);
            return filtered;
        }
        return orderedItems;
    }

    const tableData = getFiltered(selectedStatus)
    return ( 
            <>
            <div className="table-report">
                <div className="table-title">
                    <h4>Request Report</h4>
                </div>
                <div className="table-body">
                    <div className='left-bar'>
                        <FilterMenu
                                items={statusParams}
                                filterBy = "request status"
                                onItemSelect={handleStatusSelect}
                                selectedItem={selectedStatus}
                            />
                    </div>
                    <div className='right-bar'>
                            <RequestsTable REQUEST_DATA={tableData}/>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default RequestReport;