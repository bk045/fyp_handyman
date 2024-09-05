import React from 'react';

const TestimonyCard = (props) => {
    const {name, profession, text, url} = props;
    return ( 
        <div className='flex text-left'>
            <img className="rounded-3xl inline-block -w--service-image-w" src={url} alt="" />
            <div className='ml-48'>
                <p>{text}
                </p>
                <p className='italic font-bold pl-1'>{name}
                <span className='block not-italic text-gray-400'>{profession}</span>
                </p>
            </div>
        </div>
     );
}
 
export default TestimonyCard;

