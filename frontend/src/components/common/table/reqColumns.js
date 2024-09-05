import {format} from 'date-fns'
import ColumnFilter from './ColumnFilter'
import { capitalizeFirstLetter } from '../../../utils/stringManipulation'

export const COLUMNS = [
    {
        Header:'ID',
        Footer:'ID',
        accessor:'id',
        // Filter: ColumnFilter,
        disableFilters: true
    },
    {
        Header:'Requested Date',
        Footer:'Requested Date',
        accessor:'req_date_time',
        Cell:({value})=>{return format(new Date(value), 'dd/MM/yyyy')},
        // Filter: ColumnFilter
    },
    {
        Header:'Client',
        Footer:'Client',
        accessor:'client',
        // Filter: ColumnFilter
    },
    {
        Header:'Caterer',
        Footer:'Caterer',
        accessor:'caterer',
        // Filter: ColumnFilter
    },
    {
        Header:'Requested Service',
        Footer:'Requested Service',
        accessor:'req_service',
        // Filter: ColumnFilter
    },
    {
        Header:'Proposed Date',
        Footer:'Proposed Date',
        accessor:'proposed_date_time',
        Cell:({value})=>{return format(new Date(value), 'dd/MM/yyyy')},
        // Filter: ColumnFilter
    },
    {
        Header:'City',
        Footer:'City',
        accessor:'city',
        Cell:({value})=>{return capitalizeFirstLetter(value);},
        // Filter: ColumnFilter
    },
    {
        Header:'Area',
        Footer:'Area',
        accessor:'area',
        // Filter: ColumnFilter
    },
    {
        Header:'Status',
        Footer:'Status',
        accessor:'req_status',
        // Filter: ColumnFilter
    },
    {
        Header:'Description',
        Footer:'Description',
        accessor:'description',
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
        Header:'Request Info',
        Footer:'Request Info',
        columns:[
            {
                Header:'Requested Date',
                Footer:'Requested Date',
                accessor:'req_date_time',
                // Cell:({value})=>{return format(new Date(value), 'dd/MM/yyyy')},
                // Filter: ColumnFilter
            },
            {
                Header:'Client',
                Footer:'Client',
                accessor:'client',
                // Filter: ColumnFilter
            },
            {
                Header:'Caterer',
                Footer:'Caterer',
                accessor:'caterer',
                // Filter: ColumnFilter
            },
            {
                Header:'Requested Service',
                Footer:'Requested Service',
                accessor:'req_service',
                // Filter: ColumnFilter
            },
            {
                Header:'Proposed Date',
                Footer:'Proposed Date',
                accessor:'proposed_date_time',
                // Cell:({value})=>{return format(new Date(value), 'dd/MM/yyyy')},
                // Filter: ColumnFilter
            },
            {
                Header:'Status',
                Footer:'Status',
                accessor:'req_status',
                // Filter: ColumnFilter
            },
            {
                Header:'Description',
                Footer:'Description',
                accessor:'description',
                // Filter: ColumnFilter
            }
        ]
    },
    {
        Header:'Location',
        Footer:'Location',
        columns:[
            {
                Header:'City',
                Footer:'City',
                accessor:'city',
                // Filter: ColumnFilter
            },
            {
                Header:'Area',
                Footer:'Area',
                accessor:'area',
                // Filter: ColumnFilter
            },
        ]
    }]