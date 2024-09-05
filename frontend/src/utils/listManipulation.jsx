import _ from 'lodash';

export function getFilteredItems(data, parameter, value){
    const filtered = data.filter(item=>item[parameter] === value);
    return filtered;
}

export function getOrderedItems(data, parameter_array, order_array){
    const ordered = _.orderBy(data, parameter_array, order_array);
    return ordered;
}
