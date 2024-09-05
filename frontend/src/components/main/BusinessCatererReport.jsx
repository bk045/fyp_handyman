import React, { Component, useState, useEffect } from 'react';
import FilterMenu from '../common/pageItems/FilterMenu';
import BCatererTable from '../common/table/BCatererTable';
import REQUEST_DATA from './reqData.json'
import { getOrderedItems, getFilteredItems } from '../../utils/listManipulation';
import * as userService from '../../services/userService'

const BusinessCatererReport = () => {
    const [userData, setUserData] = useState([])
    const [selectedStatus, setSelectedStatus]= useState('All');
    const [selectedType, setSelectedType]= useState('All');
    const [userTypeParams, setUserTypeParams] = useState(['All', 'Individual Customer', 'Individual Caterer', 'Business Customer', 'Business Caterer'])
    const [statusParams, setStatusParams] = useState(['All', 'Active', 'Pending', 'Blocked'])
    
    useEffect(()=>{
        userService.getBCatererProfileWithName().then(response =>{
            const {data} = response;
            setUserData(data)
        });
    },[])


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

   

    return ( 
        <>
            <div className="table-title">
                Business Caterer Report
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
                    <BCatererTable REQUEST_DATA={tableData}/>
                </div>
            </div>
        </>
    );
}
 
export default BusinessCatererReport;