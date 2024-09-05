import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

class Application extends Component {
    render() { 
        return (
            <div>
                <NavBar/>
                <div className='outlet-area'>
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        );
    }
}
 
export default Application;