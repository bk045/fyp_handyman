import http from './httpService'
import config from '../config.json'

export function getListOfServices (){
    return http.get(config.serviceAPI)
}
export function getListOfBusiness (){
    return http.get(config.businessAPI)
}