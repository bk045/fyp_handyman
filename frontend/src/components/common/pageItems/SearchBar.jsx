import React from 'react';
import './SearchBar.css'
const SearchBar = () => {
    return ( 
    <div className="search-bar-group">
        <input type="text" placeholder="Enter service..." className="search-bar"/>
        <span className="mybtn mybtn-sm mybtn--accent">Search</span>
    </div>);
}
 
export default SearchBar;