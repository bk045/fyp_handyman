import React from 'react';
import {BsFillTelephoneOutboundFill} from 'react-icons/bs'
import {ImLocation2} from 'react-icons/im'
import {MdEmail} from 'react-icons/md'
import {FaFacebookF, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const btnClass="inline-block px-6 py-2.5 -bg--color-secondary-l text-white text-2xl rounded shadow-md disabled:-bg--color-secondary-l/50 hover:-bg--color-secondary hover:shadow-lg active:-bg--color-secondary-l active:shadow-lg transition duration-150 ease-in-out"

const Footer = () => {
    return ( 
        <>
            <div className='footer-container'>
                <div className='left box'>
                    <h3>About Us</h3>
                    <div className="content">
                        <p>We had a humble beginning from the streets of Gaushala, where the idea was born. Organizing the dynamic market from across the country was the mission we set out on and today have achieved that in over 10 cities in Nepal.</p>
                        {/* <p>Today, our network of handyman are serving over 100,000 customerrequests on a day to day basis with a whopping 95% satisfaction score. The road ahead is that of progress and continuous discovery to stay ahead of times and pre-empt our customer needs before they realize it themselves.</p> */}
                        <div className="social">
                            <span className='icons'><FaFacebookF size="2rem" className='icon'/></span>
                            <span className='icons'><FaTwitter size="2rem" className='icon'/></span>
                            <span className='icons'><FaInstagram size="2rem" className='icon'/></span>
                            <span className='icons'><FaYoutube size="2rem" className='icon'/></span>
                        </div>
                    </div>
                </div>
                <div className="center box">
                    <h3>Address</h3>
                    <div className="content">
                        <div className="contact">
                            <span className='icons'><ImLocation2 size={"2rem"} className='icon'/></span>
                            <span className='text'>Kathmandu</span>
                        </div>
                        <div className="contact">
                            <span className='icons'><BsFillTelephoneOutboundFill size={"2rem"} className='icon'/></span>
                            <span className='text'>+977 01-45673475</span>
                        </div>
                        <div className="contact">
                            <span className='icons'><MdEmail size={"2rem"} className='icon'/></span>
                            <span className='text'>handymanservices@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className="right box">
                    <h3>Contact Us</h3>
                    <div className="content">
                        <form action="#">
                            <div className="email">
                                <div className="text">Email</div>
                                <input type="email" required/>
                            </div>
                            <div className="msg">
                                <div className="text">Message</div>
                                <textarea rows={2} cols={25} required></textarea>
                            </div>
                            <div className="btn">
                                <button type='submit' className={btnClass}>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Footer;