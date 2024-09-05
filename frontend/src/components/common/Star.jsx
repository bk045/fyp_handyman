import React from "react";
import {AiOutlineStar} from 'react-icons/ai'
// import {FaStar, FaStarHalf } from "react-icons/fa";
import {BsStarFill, BsStarHalf, BsStar} from "react-icons/bs"

const Star = ({stars}) => {
    const ratingStar =  Array.from({length:5}, (elem, index)=>{
        let number = index + 0.5
        return <div key={index}>
            {
                stars >= index+1 ? (<BsStarFill size="2rem" color='#d05e0d'/>): stars >= number? <BsStarHalf size="2rem" color='#d05e0d'/>: <BsStar size="2rem" color='#d05e0d'/>
            }
        </div>
    })
    
    return (
                <div className="icon-style">
                    {ratingStar}
                </div>
                )};
export default Star;