import { createContext,useEffect,useState } from "react";

export const DataContext=createContext()

const DataContextProvider = (props) =>{
    const LOCATIONS = [
    "Visakhapatnam",
    'Hyderabad',
    "Bangalore",
    "Vijayawada"
];
    const [selectedLocation, setSelectedLocation] = useState("");
    const currency='₹';
    const backend_url = "http://localhost:4000";
    const [token,setToken]=useState("");

    const data={
    LOCATIONS,selectedLocation,setSelectedLocation,currency,backend_url,token,setToken,  
}

    return ( 
        <DataContext.Provider value={data}> 
            {props.children}
        </DataContext.Provider>
    )
}


export default DataContextProvider;