import './App.css';
import React, {useEffect} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { UserContext, AppContext } from './services/contextService';
import { useMemo, useState } from 'react';

// import * as Sentry from "@sentry/react";
import {toast} from 'react-toastify'
import { getJwt } from './services/authService';
import * as authService from './services/authService'
import * as requestService from './services/requestService'
import * as initialDataService from './services/initialDataService'
import jwtDecode from 'jwt-decode';

import Banner from './components/main/Banner';
import Application from './components/main/ApplicationLayout';
import LoginFormFC from './components/main/LoginFormFC';
import IndividualRegistrationFormFC from './components/main/IndividualRegistrationFormFC';
import BusinessRegistrationFormFC from './components/main/BusinessRegistrationFormFC';
import AboutUs from './components/main/AboutUs';
import OurServices from './components/main/OurServices';
import Testimony from './components/main/Testimony';
import RegistrationChoice from './components/main/RegistrationChoice';
import ProfileCardICaterer from './components/main/ProfileCardICaterer'
import ProfileCardBCaterer from './components/main/ProfileCardBCaterer';
import ProfileCardICustomer from './components/main/ProfileCardICustomer';
import ProfileCardBCustomer from './components/main/ProfileCardBCustomer';
import LogOut from './components/main/LogOut';
import CatererListPage from './components/main/CatererListPage'
import RequestFormFC from './components/main/RequestFormFC'
// import RequestPage from './components/main/RequestPage';
import ReportLayout from './components/main/ReportLayout';
import UserReport from './components/main/UserReport';
import RequestReport from './components/main/RequestReport';
// import RequestTable from './components/main/RequestTable';
// import UserTable from './components/main/UserTable';
import RequestsListPage from './components/main/RequestsListPage';
import ResetPasswordForm from './components/common/ResetPasswordForm';
import ForgotPasswordForm from './components/common/ForgotPasswordForm';
import Dashboard from './components/main/Dashboard';
import IndividualCustomerReport from './components/main/IndividualCustomerReport';
import IndividualCatererReport from './components/main/IndividualCatererReport';
import BusinessCustomerReport from './components/main/BusinessCustomerReport';
import BusinessCatererReport from './components/main/BusinessCatererReport';
import EditProfileCardBCustomer from './components/main/EditProfileCardBCustomer';
import EditProfileCardBCaterer from './components/main/EditProfileCardBCaterer';
import EditProfileCardICaterer from './components/main/EditProfileCardICaterer';
import EditProfileCardICustomer from './components/main/EditProfileCardICustomer';
import Rate from './components/common/Rate';

function App() {
  const [key, setKey] = useState({refresh:"", access:""})
  const [user, setUser] = useState({
      info:{},
      profile:{}
  })

  // console.log('From App User', user)
  const [contextData, setContextData] = useState({})
  // const [services, setServices] = useState([])

  // Keep user logged in even on refresh of page
window.addEventListener('load', async function (){
  const jwt = getJwt()
  try{
    let user_id = (jwtDecode(jwt.access).user_id);
    const {data:userInfo} = await authService.getUser(user_id)
    const {data:user_profile} = await authService.getMiniUserProfile(user_id)
    const {data:servicesList} = await initialDataService.getListOfServices()
    const {data:businessList} = await initialDataService.getListOfBusiness()
    setKey({...key, 'refresh':jwt.refresh, 'access':jwt.access})
    setUser({...user, 'profile':user_profile[0], 'info':userInfo})
    setContextData({servicesList, businessList})
  }
  catch (error){
      if (error.response && error.response.status === 401){
          toast.error("Email or password incorrect.")
      }
  }
});

  const users = useMemo(()=>({key, setKey, user, setUser}), [key, user])
  return (
    <div className="app">
      <UserContext.Provider value={users}>
      <AppContext.Provider value={contextData}>
      <Routes>
        <Route path="/handyman" element={<Application/>}>
          <Route path='login' exact element={<LoginFormFC/>}/>
          {/* <Route path='profile' exact element={<IndividualProfileOld/>}/> */}
          <Route path='register' exact element={<RegistrationChoice/>}/>
          <Route path='register/individual' element={<IndividualRegistrationFormFC/>}/>
          <Route path='register/business' element={<BusinessRegistrationFormFC/>}/>
          <Route path='about-us' exact element={<AboutUs/>}/>
          <Route path='services' exact element={<OurServices/>}/>
          <Route path='services/list' exact element={<CatererListPage/>}/>
          <Route path='testimonials' exact element={<Testimony/>}/>
          <Route path='request' exact element={<RequestFormFC/>}/>
          <Route path='request/feedback' exact element={<Rate/>}/>
          <Route path='request/list' exact element={<RequestsListPage/>}/>
          <Route path='profile' exact element={(user.info.user_type) === 'i-caterer'?<ProfileCardICaterer/>:
              (user.info.user_type) === 'i-customer'?<ProfileCardICustomer/>:
              (user.info.user_type) === 'b-caterer'?<ProfileCardBCaterer/>:
              (user.info.user_type) === 'b-customer'?<ProfileCardBCustomer/>:null}/>
          <Route path='profile/edit_b_customer' exact element={<EditProfileCardBCustomer/>}/>
          <Route path='profile/edit_b_caterer' exact element={<EditProfileCardBCaterer/>}/>
          <Route path='profile/edit_i_customer' exact element={<EditProfileCardICustomer/>}/>
          <Route path='profile/edit_i_caterer' exact element={<EditProfileCardICaterer/>}/>
          
          <Route path='logout' exact element={<LogOut/>}/>
          
          <Route path='report' exact element={<ReportLayout/>}>
            <Route path='users' exact element={<UserReport/>}>
              <Route path='i_customer' exact element={<IndividualCustomerReport/>}/>
              <Route path='i_caterer' exact element={<IndividualCatererReport/>}/>
              <Route path='b_customer' exact element={<BusinessCustomerReport/>}/>
              <Route path='b_caterer' exact element={<BusinessCatererReport/>}/>
              <Route index element={<IndividualCustomerReport/>}/>
            </Route>
            <Route path='dashboard' exact element={<Dashboard/>}/>
              {/* <Route path='user_table' exact element = {<UserTable/>}/> */}
            {/* </Route> */}
            
            <Route path='requests' exact element={<RequestReport/>}/>
              {/* <Route path='req_table' exact element = {<RequestTable/>}/> */}
            {/* </Route> */}

            <Route index element={<Dashboard/>}/>
          </Route>
          
          <Route index element={<Banner/>}/>
        </Route>
        <Route path="/forgot_password" element={<ForgotPasswordForm/>}/>
        <Route path="/reset_password" element={<ResetPasswordForm/>}/>
        <Route path="/" element={<Navigate to="/handyman"/>}></Route>
        <Route path="*" element={<h1>Page Not Found</h1>}></Route>
      </Routes>
      </AppContext.Provider>
      </UserContext.Provider>
    </div>
  );
}
// export default Sentry.withProfiler(App);
export default App;
