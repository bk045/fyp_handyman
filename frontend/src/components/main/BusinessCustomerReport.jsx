import React, { Component, useState, useEffect } from 'react';
import FilterMenu from '../common/pageItems/FilterMenu';
import BCustomerTable from '../common/table/BCustomerTable';
import REQUEST_DATA from './reqData.json'
import { getOrderedItems, getFilteredItems } from '../../utils/listManipulation';
import * as userService from '../../services/userService'
import {toast} from 'react-toastify'
import { getErrorMessage } from '../../services/errorMessageService';

const BusinessCustomerReport = () => {
    const [userData, setUserData] = useState([])
    const [selectedStatus, setSelectedStatus]= useState('All');
    const [selectedType, setSelectedType]= useState('All');
    const [userTypeParams, setUserTypeParams] = useState(['All', 'Individual Customer', 'Individual Caterer', 'Business Customer', 'Business Caterer'])
    const [statusParams, setStatusParams] = useState(['All', 'Active', 'Pending', 'Blocked'])
    
    useEffect(()=>{
            userService.getBCustomerProfileWithName().then(response =>{
                const {data} = response;
                setUserData(data)
            }, errors =>{
                toast.error(getErrorMessage(errors)+ ' (Profile Creation)')
            });
    },[])

    // console.log('Fetched Data', userData)

    const handleTypeSelect = (type)=>{
        setSelectedType(type)
        console.log('User Type Selected', type)
    }
    const handleStatusSelect = (status)=>{
        setSelectedStatus(status)
        console.log('Status Selected', status)
    }
    
    const getFiltered = (selectedStatus) =>{
        let filtered
        let orderedItems = getOrderedItems(userData, ['id'], ['desc']);
        if (selectedStatus !=='All'){
            filtered = getFilteredItems(orderedItems, 'profile_status', selectedStatus);
            return filtered;
        }
        return orderedItems;
    }

    const tableData = getFiltered(selectedStatus)

   console.log("table report",tableData)

    return ( 
        <>
            <div className="table-title">
                Business Customer Report
            </div>
            <div className="table-body">
                <div className='left-bar'>
                    <FilterMenu
                            items={statusParams}
                            filterBy = "user status"
                            onItemSelect={handleStatusSelect}
                            selectedItem={selectedStatus}
                        />
                </div>
                <div className='right-bar'>
                    <BCustomerTable REQUEST_DATA={tableData}/>
                </div>
            </div>
        </>
     );
}
 
export default BusinessCustomerReport;