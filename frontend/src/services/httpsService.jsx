import axios from 'axios';
import {toast} from 'react-toastify'

axios.interceptors.request.use(
  config =>{
  config.headers.authorization = `JWT ${localStorage.getItem('access')}`
  return config;
},
// null, 
error=>{
  const expectedError = error.response && 
                        error.response.status >= 400 && 
                        error.response.status < 500;
    if (!expectedError){
    //   console.log("Log error", error)
      toast.error(error.response.statusText + " From services")
    //   console.log(error.response)
    }
    return Promise.reject(error);
}
);



export default{
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
};