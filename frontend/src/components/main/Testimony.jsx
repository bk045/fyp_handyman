
import React from 'react';
import TestimonySwitch from '../common/carousel/TestimonySwitch';
import {getAllTestimony} from '../../db/testimonyDB';

const Testimony = () => {
    const testimonies = getAllTestimony();
    return ( 
        <div className="outlet-container">
            <h2 className="hero__title">Testimonials</h2>
            <TestimonySwitch/>
        </div>
     );
}
 
export default Testimony;