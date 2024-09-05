import React, {useMemo} from "react";
import {useTable, useRowSelect} from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import './table.css'
import { CheckBox } from "./Components";
const RowSelection = () => {
    
    const columns = useMemo(()=>COLUMNS, [])
    const data = useMemo(()=>MOCK_DATA, [])
    
    const tableInstance = useTable({
        columns,
        data
    }, useRowSelect, (hooks)=>{
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

    
    const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, selectedFlatRows} = tableInstance
    const firstPageRows = rows.slice(0,10)
    return ( <>
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
                firstPageRows.map(row=>{
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
    <pre>
        <code>
            {JSON.stringify(
                    {
                        selectedFlatRows: selectedFlatRows.map((row)=>row.original),
                    },
                    null,
                    2
                )}
        </code>
    </pre>
    </> );
}
 
export default RowSelection;