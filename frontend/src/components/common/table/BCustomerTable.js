import React, {useEffect, useMemo, useState} from "react";
import {useTable, useGlobalFilter, useFilters, usePagination, useSortBy, useRowSelect } from 'react-table'
import { COLUMNS, GROUPED_COLUMNS } from "./bCustomerColumns"
import { CheckBox } from "./Components";
import './react_table.css'
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import {useNavigate} from 'react-router-dom';
import ModalControler from "../modal/ModalControler";
import * as authService from '../../../services/authService'
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../services/errorMessageService";


const btnClass="inline-block px-6 py-2.5 m-2 -bg--color-primary-l text-white text-2xl rounded shadow-md disabled:-bg--color-primary-l/50 hover:-bg--color-primary hover:shadow-lg active:-bg--color-primary-l active:shadow-lg transition duration-150 ease-in-out"


const BCustomerTable = ({REQUEST_DATA}) => {
    const columns = useMemo(()=>COLUMNS, [])
    const data = REQUEST_DATA
    const redirectTo = useNavigate();
    const defaultColumn = useMemo(()=>{
        return {
            Filter: ColumnFilter
        }
    }, [])

    const [deleteObj, setDeleteObj] = useState(null)

    const [deleteModal, setDeleteModal] = useState({
        visibility:false,
        modalType:"",
    });

    const confirmDelete =(obj)=>{
        if (obj.response==='positive'){
            setDeleteModal({visibility: false})
            console.log('On Confirmation', deleteObj)
            authService.deleteUser(deleteObj.user_id).then(response=>{
                toast.success(obj.name_of_business + " sucessfully deleted!!!")
            });
        }
        else{
            setDeleteModal({visibility: false})
        }
    } 

    const tableInstance = useTable({
        columns,
        data,
        defaultColumn,
        initialState: {pageIndex:0}
    }, useFilters, useGlobalFilter, useSortBy, usePagination, useRowSelect, (hooks)=>{
        hooks.visibleColumns.push((columns)=>{
            return [
                {
                    id: 'actions',
                    Header: "Actions",
                    Cell:({row})=>((row.values.profile_status==='Blocked'||row.values.profile_status==='Pending')?<button className={btnClass} onClick={()=>handleActivation(row.values)}>Activate</button>:
                    (row.values.profile_status==='Active')?<div><button className={btnClass} onClick={()=>handleBlock(row.values)}>Block</button><button className={btnClass} onClick={()=>handleSuspend(row.values)}>Suspend</button></div>:null)
                },
                ...columns,
                {
                    id: 'edit',
                    Header: "Edit",
                    Cell:({row})=>(
                        <button className={btnClass} onClick={()=>handleEdit(row.values)}>Edit</button>
                    )
                },
                {
                    id: 'delete',
                    Header: "Delete",
                    Cell:({row})=>(
                        <button className={btnClass} onClick={()=>handleDelete(row.values)}>Delete</button>
                    )
                },
                
            ]
        })
    }) 
    
    const toEditPage=(obj)=>{
        redirectTo("/handyman/profile/edit_b_customer",
        {state:{obj}});
    };
    
    const handleEdit =(obj)=>{
        toEditPage(obj)
    }
    const handleActivation =(obj)=>{
        authService.activateUser(obj.user_id).then(response=>{
            let {data} = response
            toast.success(obj.name_of_business + " sucessfully activated!!!")
        }, error=>{
            toast.error(getErrorMessage(error))
        });
        
    }
    const handleBlock =(obj)=>{
        authService.blockUser(obj.user_id).then(response=>{
            let {data} = response
            toast.success(obj.name_of_business + " sucessfully blocked!!!")
        }, error=>{
            toast.error(getErrorMessage(error))
        });
    }
    const handleSuspend =(obj)=>{
        authService.suspendUser(obj.user_id).then(response=>{
            let {data} = response
            toast.success(obj.name_of_business + " sucessfully suspended!!!")
        }, error=>{
            toast.error(getErrorMessage(error))
        });
    }
    const handleDelete =(values)=>{
        setDeleteModal({visibility: true, modalType:"confirmation"})
        setDeleteObj(values)
    }

    const onRowSelected = () =>{
        console.log("Selected...")
    }

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
        {(deleteModal.visibility&&deleteModal.modalType==='confirmation')?
                <ModalControler modalVisiblity={deleteModal.visibility} modalType='confirmation' title='Are you sure you want to delete the user?' sentData={confirmDelete} redirectTo='/handyman/report/users/b_customer'/>:null}
    </div>

    </> );
}
 
export default BCustomerTable;