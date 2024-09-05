export function capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase()+ value.slice(1);
}

export const getFormDataForNonNestedObj = (object)=>{
    const formData = new FormData()
    for (let key in object){
        if (key!=='services'){
            formData.append(key, object[key])
        }
    }
    if(object.services){
        object.services.forEach((value, index) => {
            formData.append("services", value);
          });
    }
    return formData
}