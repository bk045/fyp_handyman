export const getErrorMessage = (error) =>{
    if (error.response && error.response.status >= 400 && error.response.status < 500){
        if (error.response.status === 400){
            for (let item in error.response.data){
                return (error.response.data[item][0])
            }
        }else{
            return (error.message)
        }
    }
}