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


   const data={
    LOCATIONS,selectedLocation,setSelectedLocation,currency,
    
}

    return (
        <DataContext.Provider value={data}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;