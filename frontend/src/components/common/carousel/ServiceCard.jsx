import React from 'react';
import {useNavigate} from 'react-router-dom'; 

const ServiceCard = (props) => {
    const {data} = props;
    const {url, title} = data;
    const redirectTo = useNavigate();
    
    const handleRequest=(item)=>{
        console.log(item)
        redirectTo("/handyman/services/list", {state:{service:item}})
    }

return ( 
    <div className="service-card-container flex flex-col w-fit p-5" onClick={()=>handleRequest(title)}>
        <div className='service-image mb-2 border-2 -border--color-secondary -w--service-image-w'> <img className="inline-block w-400" src={url} alt={title} /> </div>
        <button className='mybtn mybtn--outline--primary font-bold'>{title}</button>
    </div>
     );
}
 
export default ServiceCard;