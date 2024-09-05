import React from 'react';
const AboutUs = () => {
    return ( 
    <div className="flex outlet-container">
    <div className="text-left pr-10">
        <h2>About Us</h2>
        <h3 className="italic">We are a team that is dedicated to <span className="orange-text">you</span></h3>
        <p className="leading-loose">
            We had a humble beginning from the streets of Gaushala, where 
            the idea was born. Organizing the dynamic market from across the country 
            was the mission we set out on and today have achieved that in over 10 cities in Nepal. 
        </p>
        <p className="leading-loose">
            Today, our network of handyman are serving over <span className="orange-text">100,000 customer</span> 
            requests on a day to day basis with a whopping <span className="orange-text">95% satisfaction</span> score. 
            The road ahead is that of progress and continuous discovery to stay ahead of 
            times and pre-empt our customer needs before they realize it themselves.
        </p>
    </div>
    <img className= "inline-block rounded-lg shadow-lg pt-10 w-1/2"src="/images/services/carpentary-4x4.png" alt="handyman"/>
</div> );
}
 
export default AboutUs;