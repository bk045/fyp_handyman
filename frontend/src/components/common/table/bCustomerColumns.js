import {format} from 'date-fns'
import ColumnFilter from './ColumnFilter'
import { capitalizeFirstLetter } from '../../../utils/stringManipulation'

export const COLUMNS = [
    {
        Header:'ID',
        Footer:'ID',
        accessor:'user_id',
        // Filter: ColumnFilter,
        disableFilters: true
    },
    {
        Header:'Name of business',
        Footer:'Name of business',
        accessor:'name_of_business',
        // Filter: ColumnFilter
    },
    {
        Header:'Type of business',
        Footer:'Type of business',
        accessor:'type_of_business',
        // Filter: ColumnFilter
    },
    {
        Header:'Profile Picture',
        Footer:'Profile Picture',
        accessor:'profile_picture',
        Cell:({value})=>{return (value?<a href={value}><img src={value} width="100px" height="100px"></img></a>:"-")},
        // Filter: ColumnFilter
    },
    {
        Header:'Contact Person',
        Footer:'Contact Person',
        accessor:'person_to_contact',
        // Filter: ColumnFilter
    },
    {
        Header:'Contact Number',
        Footer:'Contact Number',
        accessor:'person_phone',
        // Filter: ColumnFilter
    },
    {
        Header:'Email',
        Footer:'Email',
        accessor:'email',
        // Filter: ColumnFilter
    },
    {
        Header:'Province',
        Footer:'Province',
        accessor:'province',
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
        Header:'Registration Number',
        Footer:'Registration Number',
        accessor:'registration_no',
        // Filter: ColumnFilter
    },
    {
        Header:'Document Photo',
        Footer:'Document Photo',
        accessor:'document_photo',
        Cell:({value})=>{return (value?<a href={value}><img src={value} width="100px" height="100px"></img></a>:"-")},
        // Filter: ColumnFilter
    },
    {
        Header:'Status',
        Footer:'Status',
        accessor:'profile_status',
        // Filter: ColumnFilter
    },
    {
        Header:'Joining Date',
        Footer:'Joining Date',
        accessor:'date_joined',
        Cell:({value})=>{return (value?format(new Date(value), 'dd/MM/yyyy'):"-")},
        // Filter: ColumnFilter
    },
]

export const GROUPED_COLUMNS = [
    {
        Header:'ID',
        Footer:'ID',
        accessor:'id'
    },
    {
        Header:'User Info',
        Footer:'User Info',
        columns:[
            {
                Header:'Name of business',
                Footer:'Name of business',
                accessor:'name_of_business',
                // Filter: ColumnFilter
            },
            {
                Header:'Type of business',
                Footer:'Type of business',
                accessor:'type_of_business',
                // Filter: ColumnFilter
            },
        ]
    },
    {
        Header:'Contact Info',
        Footer:'Contact Info',
        columns:[
            {
                Header:'Contact Person',
                Footer:'Contact Person',
                accessor:'person_to_contact',
                // Filter: ColumnFilter
            },
            {
                Header:'Contact Number',
                Footer:'Contact Number',
                accessor:'person_phone',
                // Filter: ColumnFilter
            },
            {
                Header:'Email',
                Footer:'Email',
                accessor:'email',
                // Filter: ColumnFilter
            },
        ]
    },
    {
        Header:'Location',
        Footer:'Location',
        columns:[
            {
                Header:'Province',
                Footer:'Province',
                accessor:'province',
                // Filter: ColumnFilter
            },
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
    },
    {
        Header:'Documents',
        Footer:'Documents',
        columns:[
            {
                Header:'Registration Number',
                Footer:'Registration Number',
                accessor:'registration_no',
                // Filter: ColumnFilter
            },
            {
                Header:'Document Photo',
                Footer:'Document Photo',
                accessor:'document_photo',
                // Filter: ColumnFilter
            },
        ]
    },
    {
        Header:'Joining Date',
        Footer:'Joining Date',
        accessor:'date_joined',
        Cell:({value})=>{return format(new Date(value), 'dd/MM/yyyy')},
        // Filter: ColumnFilter
    },
    {
        Header:'Status',
        Footer:'Status',
        accessor:'profile_status',
        // Filter: ColumnFilter
    },
]