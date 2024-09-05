import React from 'react';

const FilterMenu = (props) => {
    const {items, selectedItem, onItemSelect, filterBy} = props;
    const activate = "px-6 py-2 border-b border-gray-200 w-full bg-blue-600 text-white cursor-pointer text-center";
    return (
        <div className="filter-menu-container">
            <h4 className='title'>Filter by {filterBy.toLowerCase()}</h4>
            <ul className="body">
                {items.map(item => (<li
                                        onClick={()=>onItemSelect(item)}
                                        key={item}
                                        className={item === selectedItem ? activate : "px-6 py-2 border-b border-gray-200 w-full cursor-pointer text-center"}
                                    >
                                        {item}
                                    </li> ))}
            </ul>
      </div>
)}
 
export default FilterMenu;  
