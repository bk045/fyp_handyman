import React, {useMemo} from "react";
import {useTable, useGlobalFilter, useFilters, usePagination } from 'react-table'
import MOCK_DATA from '../MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import './react_table.css'
import GlobalFilter from "../GlobalFilter";
import ColumnFilter from "../ColumnFilter";

const AllFeatureTable = () => {
    
    const columns = useMemo(()=>COLUMNS, [])
    const data = useMemo(()=>MOCK_DATA, [])
    
    const defaultColumn = useMemo(()=>{
        return {
            Filter: ColumnFilter
        }
    }, [])

    const tableInstance = useTable({
        columns,
        data,
        defaultColumn,
        initialState: {pageIndex:2}
    }, useFilters, useGlobalFilter, usePagination) 
    
    
    const {getTableProps, getTableBodyProps, 
        headerGroups, footerGroups, 
        rows, prepareRow,
        state, setGlobalFilter, 
        page, nextPage, previousPage, canNextPage, canPreviousPage, 
        pageOptions, gotoPage, pageCount, setPageSize } = tableInstance

        const {pageIndex, pageSize, globalFilter} = state
    
    
    
    
    
    return ( <>
    {/* Adding Global Level Filter componenet */}
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
    <table {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup =>(
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column=>(
                            <th {...column.getHeaderProps()}>{column.render('Header')}
                            <div style={{color:'Black',}}>{column.canFilter? column.render('Filter'):null}</div>
                            </th>
                        ))
                    }
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {
                page.map(row=>{
                    prepareRow(row)
                    return(
                    <tr {...row.getRowProps()}>
                        {
                            row.cells.map(cell=>{
                                return(<td {...cell.getCellProps()}>{cell.render('Cell')}</td>)
                            })
                        }
                    </tr>
                    )
                })
            }
        </tbody>
    </table>

    <select onChange={e=>setPageSize(Number(e.target.value))}>
        {[10, 25, 50].map(pageSize=>(
                        <option key={pageSize} value={pageSize}>
                            Records per page: {pageSize}
                        </option>
        ))}
    </select>
    <span>
        Page:{" "}<strong>{pageIndex+1} of {pageOptions.length}</strong>
    </span>
    <span>
        | Go to page:{" "}<input type='number' defaultValue={pageIndex+1} 
        onChange={e=>{ const pageNumber = e.target.value? Number(e.target.value)-1:0
                        gotoPage(pageNumber)
        }} style={{width:'50px'}}/>
    </span>
    <div>
        <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
        <button onClick={()=>previousPage()} className='mr-6 bg-slate-500' disabled={!canPreviousPage}>Previous</button>
        <button onClick={()=>nextPage()} className='mr-6 bg-slate-500' disabled={!canNextPage}>Next</button>
        <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{">>"}</button>
    </div>

    </> );
}
 
export default AllFeatureTable;