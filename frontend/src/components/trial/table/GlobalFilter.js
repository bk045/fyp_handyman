import React,{useState} from "react";
import { useAsyncDebounce } from "react-table";

const GlobalFilter = ({filter, setFilter}) => {
    // For debouncing
    const [value, setValue] = useState(filter)
    // Causes delay in input value to read
    const onChange= useAsyncDebounce((value) =>{
        setFilter(value || undefined)
    }, 200)

    
    return ( <span>
        Search: {" "}
        <input value={value || ''} onChange={e=>{
                                                    setValue(e.target.value)
                                                    onChange(e.target.value)

                                                    }}/>
    </span> );
    
    // Without applying debounce
    // return ( <span>
    //     Search: {" "}
    //     <input value={filter || ''} onChange={e=>setFilter(e.target.value)}/>
    // </span> );
}
 
export default GlobalFilter;