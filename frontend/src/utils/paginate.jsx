import _ from 'lodash';

export function paginate(item_array, pageNo, pageSize){
    const startIndex = (pageNo-1)*pageSize;
    return _(item_array).slice(startIndex).take(pageSize).value()
}