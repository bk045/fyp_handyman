import React, { useState } from "react";
import { Formik, Form } from "formik";
import FormikControl from "./forms/FormikControl";
import {FaStar, FaStarHalf } from "react-icons/fa";
import * as Yup from 'yup'
import { redirect, useLocation } from "react-router-dom";
import * as requestService from '../../services/requestService'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};
const btnClass="inline-block px-6 py-2.5 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"
const inputClass = "form-control block w-full px-3 py-1.5 text-2xl text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-2 disabled:text-gray-400 focus:text-gray-700 focus:bg-white focus:-border--color-primary focus:outline-none"


const Rate = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
    console.log("On Click",value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const location = useLocation();
  const redirectTo = useNavigate();

  const initialValues = {
    user_feedback:""
    }
  
  const validationSchema = Yup.object({
      user_feedback:Yup.string().nullable().label('Comments'),
  })

const onSubmit = (values, propsOnSubmit) =>{
    if (currentValue !== 0){
      let id = location.state.reqId
      let payload = {"user_feedback":values.user_feedback, "ratings":currentValue, "request":id}
      console.log('Payload', payload)
      console.log('id', id)
      requestService.rateAndFeedbackRequest(location.state.reqId, payload)
      redirectTo('/handyman/request/list')
      toast.success("Thank you for your feedback!!!")
    }else{
      toast.error("Rating cannot be zero!!!")
    }
}
  return (
    <div className='shadow-myBoxShadow form-wrapper outlet-container'>
    <div className="rating-container">
      <h2> Your Feedback </h2>
      <div className="stars">
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
    
      <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
            {
            formik=> {
                return <Form>
                        <FormikControl className={inputClass} placeholder="What's your experience?" control='textarea' type='text' name='user_feedback'/>
                        {/* <textarea
                            placeholder="What's your experience?"
                            className="comment-section"
                        /> */}

                        <button
                            className={btnClass}
                            type='submit'
                        >
                            Submit
                        </button>
                        </Form>
                        }
            }
      </Formik>
    </div>
    </div>
  );
}; 
 
export default Rate;