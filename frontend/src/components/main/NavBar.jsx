import React, {useState, useContext}from "react";
import {BsPersonCircle} from "react-icons/bs";
import {GoPerson} from "react-icons/go";
import {FaAngleRight, FaTasks} from "react-icons/fa";
import {HiOutlineLogout} from "react-icons/hi";
import { NavLink } from 'react-router-dom';
import SearchBar from "../common/pageItems/SearchBar";
import { UserContext } from "../../services/contextService"
import * as authService from '../../services/authService'
import './NavBar.css'

const NavBar = () => {
    const [menuVisible, setMenuVisiblity] = useState(false)
    const {user} = useContext(UserContext)
    const toggleMenu=()=>{
        setMenuVisiblity(!menuVisible)
     }
   //   console.log('From Nav user', user)
    return ( 
    <>
        <nav className="nnav">
                <img src="/images/logo.png" alt="" className="logo"/>
                {/* <div className="nav-search"><SearchBar/></div> */}
                <ul>
                <NavLink to="/handyman"><li><span>Home</span></li></NavLink>
                <NavLink to="/handyman/about-us"><li><span>About</span></li></NavLink>
                <NavLink to="/handyman/services"><li><span>Services</span></li></NavLink>
                <NavLink to="/handyman/testimonials"><li><span>Testimonials</span></li></NavLink>
                {((user.info.email !== null) && (user.info.user_type==='staff'))?<NavLink to="/handyman/report"><li><span>Report</span></li></NavLink>:""}
                </ul>
                <div className="btn-group">
                {(!user.info.id)&&<NavLink to="/handyman/login"><div className="mybtn mybtn-sm mybtn--outline--secondary">Log In</div></NavLink>}
                {(!user.info.id)&&<NavLink to="/handyman/register"><div className="mybtn mybtn-sm mybtn--outline--secondary">Join Us</div></NavLink>}
                </div>
                {(user.info.id) &&
                     <div className="profile-group">
                        <BsPersonCircle color='#d05e0d' size="5rem" className="p-pic" onClick={()=>toggleMenu()}/>
                        <div className="p-name">{user.info.user_type}</div>
                     </div>
               }
               
                <div className={menuVisible?"sub-menu-wrap open-menu": "sub-menu-wrap"}>
                    <div className="sub-menu">
                         <div className="user-info">
                            <h3>{user.profile.name}</h3>
                         </div>

                           <NavLink to="/handyman/profile">
                              <div className="sub-menu-link">
                                 <GoPerson className="icon" size={"2.5rem"}/>
                                 <span>Profile</span>
                                 <FaAngleRight className="arrow-right"/>
                              </div>
                           </NavLink>

                           <NavLink to="/handyman/request/list">
                           <div className="sub-menu-link">
                              <FaTasks className="icon" size={"2.5rem"}/>
                              <span>Requests</span>
                              <FaAngleRight className="arrow-right"/>
                           </div>
                           </NavLink>

                           <NavLink to="/handyman/logout">
                              <div className="sub-menu-link">
                                 <HiOutlineLogout className="icon" size={"3rem"}/>
                                 <span>Log Out</span>
                                 <FaAngleRight className="arrow-right"/>
                              </div>
                           </NavLink>

                    </div>
                </div>
        </nav>
    </>
     ); 
}
 
export default NavBar;
