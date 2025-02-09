import React, {useMemo} from "react";
import {useTable, useColumnOrder} from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import './table.css'
const ColumnOrder = () => {
    
    const columns = useMemo(()=>COLUMNS, [])
    const data = useMemo(()=>MOCK_DATA, [])
    
    const tableInstance = useTable({
        columns,
        data
    }, useColumnOrder) 
    
    const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, setColumnOrder} = tableInstance

    const changeOrder=()=>{
        setColumnOrder(['id', 'first_name', 'last_name', 'phone', 'dob', 'country'])
    }

    return ( <>
    <button onClick={changeOrder}>Change column order</button>
    <table {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup =>(
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(columns=>(
                            <th {...columns.getHeaderProps()}>{columns.render('Header')}</th>
                        ))
                    }
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {
                rows.map(row=>{
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
        <tfoot>
            {footerGroups.map(footerGroup=>(
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {
                                footerGroup.headers.map(column=>(
                                     <td {...column.getFooterProps()}>
                                        {
                                            column.render('Footer')
                                        }

                                     </td>
                                ))
                            }
                        </tr>
                    ))
            }
        </tfoot>
    </table>
    </> );
}
 
export default ColumnOrder;