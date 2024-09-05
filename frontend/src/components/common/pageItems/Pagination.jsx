import React, { Component, createContext } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';  

const Pagination = (props) => {
    // console.log(props.currentPage);
    const {pageSize, itemsCount, currentPage, onPageChange} = props;
    const pageCount = Math.ceil(itemsCount/pageSize);
    // if (pageCount===1) return null;
    const pages = _.range(1, pageCount+1);
    const activeClass = "page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md";
    const inactiveClass = "page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none";

    return (
        <ul className="flex list-style-none m-8">
          {pages.map(pageNo =>
                    <li key={pageNo} className={pageNo === currentPage ? "page-item active" : "page-item"}>
                      <a onClick={()=> onPageChange(pageNo)} className={pageNo === currentPage ? activeClass : inactiveClass} href="#">
                        {pageNo}
                      </a>
                    </li>)
                    }
        </ul>
     );
}
Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired, 
  itemsCount:PropTypes.number.isRequired, 
  currentPage:PropTypes.number.isRequired,
  onPageChange:PropTypes.func.isRequired,
}
export default Pagination;
