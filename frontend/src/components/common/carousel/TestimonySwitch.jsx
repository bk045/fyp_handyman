import React, { Component } from 'react';
import TestimonyCard from './TestinomyCard';
import { getAllTestimony } from '../../../db/testimonyDB';
import { BiCircle } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";

class TestimonySwitch extends Component {
    state = { 
        id:"",
        name:"",
        profession:"",
        text:"",
        url:"",
     } 
     componentDidMount(){
        const testimony = getAllTestimony()[0];
        const {id, name, profession, text, url} = testimony;
        this.setState({id, name, profession, text, url});
     }
     handelClick(testimony_id){
        const testimony_arr = getAllTestimony().filter(item=>item.id === testimony_id);
        const testimony = testimony_arr[0];
        const {id, name, profession, text, url} = testimony;
        this.setState({id, name, profession, text, url});
     }
    render() { 
        const {name, profession, text, url} = this.state;
        return (
        <div>
            <div>
                <TestimonyCard
                name = {name}
                text = {text}
                url = {url}
                profession = {profession}
                />
                
            </div>
            <div className='flex flex-cols justify-center mt-10'>
                {
                    getAllTestimony().map(item=>
                        <div key={item.id} className='cursor-pointer' onClick={()=>this.handelClick(item.id)}>{item.id === this.state.id ? <FaCircle/> : <BiCircle/>}</div>)
                }
            </div>
        </div>);
    }
}
 
export default TestimonySwitch;