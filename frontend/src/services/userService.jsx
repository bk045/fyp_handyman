import http from './httpService'
import https from './httpsService'
import config from '../config.json'

export function getICustomerProfileWithName(){
    return https.get(config.iCustomerWithNameAPI)
}
export function getICatererProfileWithName(){
    return https.get(config.iCatererWithNameAPI)
}
export function getBCatererProfileWithName(){
    return https.get(config.bCatererWithNameAPI)
}
export function getBCustomerProfileWithName(){
    return https.get(config.bCustomerWithNameAPI)
}
export function getAllICustomerProfileWithName(){
    return https.get(config.allICustomerWithNameAPI)
}
export function getAllICatererProfileWithName(){
    return https.get(config.allICatererWithNameAPI)
}
export function getAllBCatererProfileWithName(){
    return https.get(config.allBCatererWithNameAPI)
}
export function getAllBCustomerProfileWithName(){
    return https.get(config.allBCustomerWithNameAPI)
}

export function getActiveBCatererProfileWithName(){
    return https.get(config.activeBCatererWithNameAPI)
}

export function getActiveICatererProfileWithName(){
    return https.get(config.activeICatererWithNameAPI)
}