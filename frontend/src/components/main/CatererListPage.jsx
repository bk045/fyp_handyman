import React, {useState, useEffect} from 'react';
import CatererLists from '../common/CatererLists'
import Pagination from '../common/pageItems/Pagination';
import { paginate } from '../../utils/paginate';
import { getFilteredItems, getOrderedItems } from '../../utils/listManipulation';
import FilterMenu from '../common/pageItems/FilterMenu';
import SearchBox from '../common/forms/SearchBox';
import * as userService from '../../services/userService'
import { useLocation } from 'react-router-dom';


const CatererListPage = ()=>{
        const [bCaterers, setBCaterers] = useState([])
        const [iCaterers, setICaterers] = useState([])
        const [queryString, setQueryString] = useState("")
        const [caterers, setCaterers] = useState([])
        const location = useLocation();
        useEffect(()=>{
            userService.getActiveBCatererProfileWithName().then(response=>{
                const {data:activeBCat} = response;
                setBCaterers(activeBCat)
            })
        },[])
        useEffect(()=>{
                userService.getActiveICatererProfileWithName().then((response)=>{
                    const {data:activeICat} = response;
                    setICaterers(activeICat)
                })
        },[])
        useEffect(()=>{
            setCaterers([...bCaterers, ...iCaterers])
        },[bCaterers, iCaterers])
        
        useEffect(()=>{
            console.log(location.state)
            setQueryString(location.state.service)
        },[])
        

        const[locationFilterParams, setLocationFilterParms]=useState(['All', 'Gaushala', 'New Road', 'Kamalpokhari', 'Baneshower', 'Koteshower'])
        // For Pagination
        const [pageSize, setPageSize]=useState(6);
        const [currentPage, setCurrentPage]= useState(1);
        //Sorting and Filtering
        const [selectedLocation, setSectedLocation] = useState('All');
  

    const getFilteredAndSorted = (selectedLocation, caterers) =>{
        let filteredItems = [];
        let orderedItems = getOrderedItems(caterers, ['avg_rating','name'], ['desc', 'desc']);
        if (selectedLocation !== 'All'){
            filteredItems = getFilteredItems(orderedItems, 'area', selectedLocation);
            return filteredItems;
        }

        return orderedItems;
    }
    const handleSearch = ({currentTarget:element}) =>{
        setQueryString(element.value)
    }

    const handlePageChange = pageNo =>{
        setCurrentPage(pageNo);
    }

    const handleLocationSelect = location =>{
        setSectedLocation(location);
        setCurrentPage(1);
    }
    const getDisplayItems= ()=>{
        console.log('Get displayed Items querystring', queryString)
        if (queryString === null || queryString ==="" || queryString === undefined){
            return getFilteredAndSorted(selectedLocation, [...iCaterers, ...bCaterers])
        }else{
            const result = caterers.filter(caterer=>caterer.services.toLowerCase().includes(queryString.toLowerCase()))
            return getFilteredAndSorted(selectedLocation, result)
        }
    }
    const displayItems = getDisplayItems();
    const pg_caterers = paginate(displayItems, currentPage, pageSize)

        return (
            <div className='list-container-caterer'>
                <div className='left-col'>
                        <FilterMenu
                            items={locationFilterParams}
                            filterBy = "location"
                            onItemSelect={handleLocationSelect}
                            selectedItem={selectedLocation}
                        />
                </div>
                <div className='right-col'>
                        <div className='search'>
                            <SearchBox
                                name={"search"}
                                placeholder = {"Search service..."}
                                onChange={handleSearch}
                            />
                        </div>
                    <div className='card-list'>
                        <CatererLists data={pg_caterers}/>
                    </div>
                    <div className='pagination'>
                        <Pagination
                            itemsCount={displayItems.length}
                            pageSize = {pageSize}
                            currentPage = {currentPage}
                            onPageChange = {handlePageChange}>
                        </Pagination>
                    </div>
                </div>
            </div>
        );
}
 
export default CatererListPage;