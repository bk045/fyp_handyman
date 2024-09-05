import React from 'react';
import {BsPersonSquare, BsFillArrowRightCircleFill} from 'react-icons/bs';
import { FaBuilding } from 'react-icons/fa';

import { NavLink } from 'react-router-dom';
const RegistrationChoice = () => {
    return ( 
        <div className='shadow-myBoxShadow p-20 flex flex-col items-center outlet-container'>
            <h2>Who are you?</h2>
            <NavLink to='/handyman/register/individual'>
                <div className='reg-choice m-10 shadow-myBoxShadow rounded-3xl w-[45rem] h-32 flex items-center justify-between'>
                <div className='p-4'><BsPersonSquare color='#d05e0d' size="6rem"/></div>
                    <div className="font-semibold text-4xl">I am an Individual</div>
                    <div className="ml-8 pr-6"><BsFillArrowRightCircleFill color='#d05e0d' size="3rem"/></div>
                </div>
            </NavLink>
            <NavLink to='/handyman/register/business'>
            <div className='reg-choice m-10 shadow-myBoxShadow rounded-3xl w-[45rem] h-32 flex items-center justify-between'>
                <div className='p-4'><FaBuilding color='#d05e0d' size="6rem"/></div>
                <div className="font-semibold text-4xl">I am a Business House</div>
                <div className="ml-8 pr-6"><BsFillArrowRightCircleFill color='#d05e0d' size="3rem"/></div>
            </div>
            </NavLink>
        </div>
     );
}
 
export default RegistrationChoice;