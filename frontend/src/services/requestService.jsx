import http from './httpService'
import https from './httpsService'
import config from '../config.json'

export function makeRequest (requestInfo){
    return https.post(config.requestAPI, requestInfo)    
}
export function acceptRequest (requestID, requestInfo){
    return https.post(config.requestAPI+`${requestID}/request_accpted/accept/`, requestInfo)    
}

export function completeRequest (requestID, requestInfo){
    return https.post(config.requestAPI+`${requestID}/request_completed/complete/`, requestInfo)    
}
export function declineRequest (requestID, requestInfo){
    return https.post(config.requestAPI+`${requestID}/request_declined/decline/`, requestInfo)    
}
export function rateAndFeedbackRequest (requestID, ratingValue){
    return https.post(config.requestAPI+`${requestID}/request_rating/`, ratingValue)    
}
export function getDeclineReasons (){
    return https.get(config.baseAPI+'decline_reasons/')    
}

export function getServiceProviderServices (catererId){
    return https.get(config.serviceAPI+`mine/${catererId}/`)    
}

export function getUserRequestsWithName(user_id){
    return https.get(config.userAPI+`${user_id}/user_requests_with_name/`)
}
export function getAllRequestsWithName(){
    return https.get(config.requestsWithNameAPI)
}
export function getCancelledRequestCount(){
    return https.get(config.baseAPI+'cancelled_request_count/')
}
export function getAcceptedRequestCount(){
    return https.get(config.baseAPI+'accepted_request_count/')
}
export function getCompletedRequestCount(){
    return https.get(config.baseAPI+'completed_request_count/')
}
export function getPlacedRequestCount(){
    return https.get(config.baseAPI+'placed_request_count/')
}

export function getActiveICustomerCount(){
    return https.get(config.baseAPI+'active_i_customer_count/')
}
export function getActiveICatererCount(){
    return https.get(config.baseAPI+'active_i_caterer_count/')
}
export function getActiveBCustomerCount(){
    return https.get(config.baseAPI+'active_b_customer_count/')
}
export function getActiveBCatererCount(){
    return https.get(config.baseAPI+'active_b_caterer_count/')
}

export function getActiveUserCount(){
    return https.get(config.baseAPI+'active_user_count/')
}
export function getDeletedUserCount(){
    return https.get(config.baseAPI+'deleted_user_count/')
}
export function getBlockedUserCount(){
    return https.get(config.baseAPI+'blocked_user_count/')
}