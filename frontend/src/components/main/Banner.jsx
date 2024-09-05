import React from 'react';
const Banner = () => {
    return ( <div className="banner-container text-left">
        <div className="banner-text">
            <h1>Get things repaired <br/>
                the <span className='orange-text'>HANDYMAN</span> way</h1>
            <p>While you concentrate on making your life work, we will help you in ensuring your house and household items function properly!</p>
        </div>
        <div><img className="banner-image" src="images/banner.png" alt="" /></div>
    </div> );
}
 
export default Banner;