import React, {useEffect, useContext, useState} from 'react';
import Pagination from '../common/pageItems/Pagination';
import { paginate } from '../../utils/paginate';
import { getFilteredItems, getOrderedItems } from '../../utils/listManipulation';
import RequestLists from '../common/RequestLists';
import * as requestService from '../../services/requestService'
import { UserContext } from "../../services/contextService";
import FilterMenu from '../common/pageItems/FilterMenu';

const RequestsListPage = ()=>{
        const {user} = useContext(UserContext);
        const {info, profile} = user
        const [requests, setRequests] = useState([])

        const [selectedStatus, setSelectedStatus] = useState('All')
        
        useEffect(()=>{
                requestService.getUserRequestsWithName(user.info.id).then(response =>{
                        const {data} = response;
                        setRequests(data)
                });
                },[user])

        const [pageSize, setPageSize]=useState(3);
        const [currentPage, setCurrentPage]= useState(1);

        const statusParams = ['All', 'Placed', 'Accepted', 'Cancelled','Completed']
        
    const handleStatusSelect = (status)=>{
        setSelectedStatus(status)
        setCurrentPage(1);
    } 

    const getFilteredAndSorted = (selectedStatus, requests) =>{
        let filteredItems = [];
        let orderedItems = getOrderedItems(requests, ['req_date_time'], ['desc']);
        if (selectedStatus !== 'All'){
            filteredItems = getFilteredItems(orderedItems, 'req_status', selectedStatus);
            return filteredItems;
        }

        return orderedItems;
    }

    const handlePageChange = pageNo =>{
        setCurrentPage(pageNo);
    }
        
        
    const displayItems = getFilteredAndSorted(selectedStatus, requests);
    const ordered_requests = paginate(displayItems, currentPage, pageSize)

        return (
            <div className='list-container-request'>
                <div className='left-col'>
                        <FilterMenu
                            items={statusParams}
                            filterBy = "status"
                            onItemSelect={handleStatusSelect}
                            selectedItem={selectedStatus}
                        />
                </div>
                <div className='right-col'>
                    <h1 className='text-left'>Request List</h1>
                    <div className='card-list'>
                        <RequestLists data={ordered_requests}/>
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
 
export default RequestsListPage;