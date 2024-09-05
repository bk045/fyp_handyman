import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const btnClass="inline-block px-6 py-2.5 mr-8 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"

const ReportLayout = () => {
    return ( 
        <>
        <div className='shadow-myBoxShadow report-layout-wrapper outlet-container'>
            <div className='report-navigation'>
            <NavLink to="/handyman/report/dashboard">
                <span className={btnClass}>Dashboard</span>
            </NavLink>
            <NavLink to="/handyman/report/requests">
                <span className={btnClass} >Requests</span>
            </NavLink>
            <NavLink to="/handyman/report/users">
                <span className={btnClass}>Users</span>
            </NavLink>
            </div>
            <div className='report-body'>
                <Outlet/>
            </div>
        </div>
        </>
     );
}
 
export default ReportLayout;