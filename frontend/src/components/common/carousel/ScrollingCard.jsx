import React from 'react';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import { getServiceImages } from '../../../db/images';
import ServiceCard from './ServiceCard';

const ScrollingCard = () => {
    const slidLeft=()=>{
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
      }
    const slidRight=()=>{
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
    }
    
    return ( 
        <div>
          <div className="relative flex items-center w-[130rem]">
          <MdChevronLeft className='cursor-pointer opacity-50 hover:opacity-100' onClick={slidLeft} size={40}/>
            <div id="slider" className="hide-scroll-wfun flex w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth">
            {getServiceImages().map(item => <div key={item.title} className="m-5">
                <ServiceCard
              data = {item}
              />
            </div>)}
            </div>
          <MdChevronRight className='cursor-pointer opacity-50 hover:opacity-100' onClick={slidRight} size={40}/>
          </div>
      </div>
     );
}
 
export default ScrollingCard;