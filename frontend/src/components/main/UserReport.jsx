import React, { Component, useState, useEffect } from 'react';
import FilterMenu from '../common/pageItems/FilterMenu';
import RequestsTable from '../common/table/RequestsTable';
import REQUEST_DATA from './reqData.json'
import { getOrderedItems, getFilteredItems } from '../../utils/listManipulation';
import * as requestService from '../../services/requestService'
import { NavLink, Outlet } from 'react-router-dom';



const btnClass="inline-block px-6 py-2.5 mr-8 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"

const UserReport = () => {
    const [userData, setUserData] = useState([])
    const [selectedStatus, setSelectedStatus]= useState('All');
    const [selectedType, setSelectedType]= useState('All');
    const [userTypeParams, setUserTypeParams] = useState(['All', 'Individual Customer', 'Individual Caterer', 'Business Customer', 'Business Caterer'])
    const [statusParams, setStatusParams] = useState(['All', 'Active', 'Pending', 'Blocked'])
    
    useEffect(()=>{
        requestService.getAllRequestsWithName().then(response =>{
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
            filtered = getFilteredItems(orderedItems, 'req_status', selectedStatus);
            return filtered;
        }
        return orderedItems;
    }

    const tableData = getFiltered(selectedStatus)

   

    return ( 
        <>
            <div className="btn-navigation">
                <NavLink to="/handyman/report/users/i_customer">
                    <span className={btnClass}>Individual Customer</span>
                </NavLink>
                <NavLink to="/handyman/report/users/i_caterer">
                    <span className={btnClass} >Individual Caterer</span>
                </NavLink>
                <NavLink to="/handyman/report/users/b_customer">
                    <span className={btnClass}>Business Customer</span>
                </NavLink>
                <NavLink to="/handyman/report/users/b_caterer">
                    <span className={btnClass} >Business Caterer</span>
                </NavLink>
            </div>
            <div className='table-report'>
                <Outlet/>
            </div>
        </>
     );
}
 
export default UserReport;