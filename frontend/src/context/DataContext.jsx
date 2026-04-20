import { createContext,useEffect,useState } from "react";
import axios from "axios";

export const DataContext=createContext()

const DataContextProvider = (props) =>{

    const backend_url = import.meta.env.BACKEND_URL || "http://localhost:4000"
    const currency='₹';
    const [category,setCategory] = useState("all");
    const [products,setProducts] = useState([]);

    const [token,setToken]=useState("");

    const fetchProducts = async () =>{
        try {
            
            const response = await axios.post(backend_url+"/api/product/list")
            if (response.data.success) {
                setProducts(response.data.products)
            }
            else{
                console.log(response.data);
            }

        } catch (error) {
            console.log(error.message);
            
        }
        
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    const data={
        currency,backend_url,token,setToken,products,
}

    return ( 
        <DataContext.Provider value={data}> 
            {props.children}
        </DataContext.Provider>
    )
}


export default DataContextProvider;