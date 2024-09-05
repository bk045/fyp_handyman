import {format} from 'date-fns'
import ColumnFilter from './ColumnFilter'

export const COLUMNS = [
    {
        Header:'ID',
        Footer:'ID',
        accessor:'id',
        // Filter: ColumnFilter,
        disableFilters: true
    },
    {
        Header:'First Name',
        Footer:'First Name',
        accessor:'first_name',
        // Filter: ColumnFilter
    },
    {
        Header:'Last Name',
        Footer:'Last Name',
        accessor:'last_name',
        // Filter: ColumnFilter
    },
    {
        Header:'DOB',
        Footer:'DOB',
        accessor:'dob',
        Cell:({value})=>{return format(new Date(value), 'dd/MM/yyyy')},
        // Filter: ColumnFilter
    },
    {
        Header:'Country',
        Footer:'Country',
        accessor:'country',
        // Filter: ColumnFilter
    },
    {
        Header:'Phone',
        Footer:'Phone',
        accessor:'phone',
        // Filter: ColumnFilter
    }
]

export const GROUPED_COLUMNS = [
    {
        Header:'ID',
        Footer:'ID',
        accessor:'id'
    },
    {
        Header:'Name',
        Footer:'Name',
        columns:[
            {
                Header:'First Name',
                Footer:'First Name',
                accessor:'first_name'
            },
            {
                Header:'Last Name',
                Footer:'Last Name',
                accessor:'last_name'
            }
        ]
    },
    {
        Header:'Info',
        Footer:'Info',
        columns:[
            {
                Header:'DOB',
                Footer:'DOB',
                accessor:'dob'
            },
            {
                Header:'Country',
                Footer:'Country',
                accessor:'country'
            },
            {
                Header:'Phone',
                Footer:'Phone',
                accessor:'phone'
            }
        ]
    }]