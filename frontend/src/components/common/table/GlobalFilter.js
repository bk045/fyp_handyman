import React,{useState} from "react";
import { useAsyncDebounce } from "react-table";
import './react_table.css'

const GlobalFilter = ({filter, setFilter}) => {
    // For debouncing
    const [value, setValue] = useState(filter)
    // Causes delay in input value to read
    const onChange= useAsyncDebounce((value) =>{
        setFilter(value || undefined)
    }, 200)

    
    return ( <div className="g-search-bar">
        <span>
            Search Entire Table: {" "}
            <input value={value || ''} onChange={e=>{
                                                        setValue(e.target.value)
                                                        onChange(e.target.value)
                                                        }}/>
        </span>
    </div> );
    
    // Without applying debounce
    // return ( <span>
    //     Search: {" "}
    //     <input value={filter || ''} onChange={e=>setFilter(e.target.value)}/>
    // </span> );
}
 
export default GlobalFilter;