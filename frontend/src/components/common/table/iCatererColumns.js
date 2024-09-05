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
        Header:'Full Name',
        Footer:'Full Name',
        accessor:'name',
        // Cell:({value})=>{return format(new Date(value), 'dd/MM/yyyy')},
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
        Header:'Gender',
        Footer:'Gender',
        accessor:'gender',
        // Filter: ColumnFilter
    },
    {
        Header:'Mobile',
        Footer:'Mobile',
        accessor:'mobile',
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
        Header:'Services',
        Footer:'Services',
        accessor:'services',
        // Filter: ColumnFilter
    },
    {
        Header:'ID Type',
        Footer:'ID Type',
        accessor:'id_type',
        // Filter: ColumnFilter
    },
    {
        Header:'ID Number',
        Footer:'ID Number',
        accessor:'id_number',
        // Filter: ColumnFilter
    },
    {
        Header:'ID Photo',
        Footer:'ID Photo',
        accessor:'id_photo',
        Cell:({value})=>{return (value?<a href={value}><img src={value} width="100px" height="100px"></img></a>:"-")},
        // Filter: ColumnFilter
    },
    {
        Header:'Joining Date',
        Footer:'Joining Date',
        accessor:'date_joined',
        Cell:({value})=>{return (value?format(new Date(value), 'dd/MM/yyyy'):"-")},
        // Filter: ColumnFilter
    },
    {
        Header:'Status',
        Footer:'Status',
        accessor:'profile_status',
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
                Header:'Full Name',
                Footer:'Full Name',
                accessor:'name',
                // Filter: ColumnFilter
            },
            {
                Header:'Gender',
                Footer:'Gender',
                accessor:'gender',
                // Filter: ColumnFilter
            },
        ]
    },
    {
        Header:'Contact Info',
        Footer:'Contact Info',
        columns:[
            {
                Header:'Mobile',
                Footer:'Mobile',
                accessor:'mobile',
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
                Header:'ID Type',
                Footer:'ID Type',
                accessor:'id_type',
                // Filter: ColumnFilter
            },
            {
                Header:'ID Number',
                Footer:'ID Number',
                accessor:'id_number',
                // Filter: ColumnFilter
            },
            {
                Header:'ID Photo',
                Footer:'ID Photo',
                accessor:'id_photo',
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