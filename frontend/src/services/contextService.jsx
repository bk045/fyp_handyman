import { createContext } from "react";


export const UserContext = createContext(null);
export const ServiceContext = createContext(null);
export const AppContext = createContext(null);
// const AppContext = createContext();
// const AppProvider = ({children})=>{
//     return <AppContext.Provider value={"Bhishan"}>{children}</AppContext.Provider>
// };
// const useGlobalContext=()=>{
//     return useContext(AppContext);
// };
// export {AppContext, AppProvider, useGlobalContext}