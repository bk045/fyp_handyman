import React, {useMemo, forwardRef, useImperativeHandle, useRef} from "react";
import {useTable, useGlobalFilter, useFilters, usePagination, useSortBy, useRowSelect } from 'react-table'
import { COLUMNS, GROUPED_COLUMNS } from "./reqColumns";
import { CheckBox } from "./Components";
import './react_table.css'
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";
import { BiSortDown, BiSortUp } from "react-icons/bi";


const btnClass="inline-block px-6 py-2.5 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"


const RequestsTable = ({REQUEST_DATA, sendRows}) => {
    const columns = useMemo(()=>COLUMNS, [])
    const data = REQUEST_DATA
    
    const defaultColumn = useMemo(()=>{
        return {
            Filter: ColumnFilter
        }
    }, [])

    const tableInstance = useTable({
        columns,
        data,
        defaultColumn,
        initialState: {pageIndex:0}
    }, useFilters, useGlobalFilter, useSortBy, usePagination, useRowSelect, (hooks)=>{
        hooks.visibleColumns.push((columns)=>{
            return [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps })=>(
                        <CheckBox {...getToggleAllRowsSelectedProps()}/>
                    ),
                    Cell:({row})=>(
                        <CheckBox {...row.getToggleRowSelectedProps()}/>
                    )
                },
                ...columns
            ]
        })
    }) 
    
    
    const getSelectedRows= () =>{
            let rowsCollection = []
            for (let object of selectedFlatRows){
                let {values} = object
                rowsCollection = [...rowsCollection, values]
            }
            console.log('rowsCollection', rowsCollection)
            return rowsCollection
        };
    

    const {getTableProps, getTableBodyProps, 
        headerGroups, footerGroups, 
        rows, prepareRow,
        state, setGlobalFilter, 
        page, nextPage, previousPage, canNextPage, canPreviousPage, 
        pageOptions, gotoPage, pageCount, setPageSize,
        selectedFlatRows } = tableInstance

        const {pageIndex, pageSize, globalFilter} = state

    return ( <>
    {/* Adding Global Level Filter componenet */}
    <div className="react-table-body">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup =>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column=>(
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                <div className="c-search-bar">{column.canFilter? column.render('Filter'):null}</div>
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? <BiSortDown/> : <BiSortUp/>): ""}
                                </span>
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
    </div>

    <div className="footer-controle">
        <div className="page-size">
            <select onChange={e=>setPageSize(Number(e.target.value))}>
                {[10, 25, 50].map(pageSize=>(
                                <option key={pageSize} value={pageSize}>
                                    Records per page: {pageSize}
                                </option>
                ))}
            </select>
        </div>
        <div className="page-group">
            <span>
                Page:{" "}<strong>{pageIndex+1} of {pageOptions.length} </strong>
            </span>
            <span>
                | Go to page:{" "}<input type='number' defaultValue={pageIndex+1}
                onChange={e=>{ const pageNumber = e.target.value? Number(e.target.value)-1:0
                                gotoPage(pageNumber)
                }} style={{width:'50px'}}/>
            </span>
        </div>
        <div className="btn-group">
            <button onClick={()=>gotoPage(0)} className={btnClass} disabled={!canPreviousPage}>{"<<"}</button>
            <button onClick={()=>previousPage()} className={btnClass} disabled={!canPreviousPage}>Previous</button>
            <button onClick={()=>nextPage()} className={btnClass} disabled={!canNextPage}>Next</button>
            <button onClick={()=>gotoPage(pageCount-1)} className={btnClass} disabled={!canNextPage}>{">>"}</button>
        </div>
    </div>

    </> );
}
 
export default RequestsTable;