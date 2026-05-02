import { createContext,useEffect,useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DataContext=createContext()

const DataContextProvider = (props) =>{
    console.log(import.meta.env.VITE_BACKEND_URL);
    

    const backend_url = import.meta.env.VITE_BACKEND_URL

    const currency='₹';
    const deliveryFee = 20;
    const [category,setCategory] = useState("all");
    const [products,setProducts] = useState([]);
    const [search,setSearch] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const [qty,setQty]= useState(1)
    const [cartData,setCartData] = useState({})
    const [dataLoaded,setDataLoaded] = useState(false)

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: ""
    })

    const fetchProfile = async () => { 
        try {
            const res = await axios.post(backend_url + "/api/profile/getprofile",{},{ headers: { token }})
            
            if (res.data.success) {
                const user = res.data.user
                setForm({
                    name: user.name || "",
                    email:user.email,
                    phone: user.phone || "",
                    address: user.address || "",
                    city: user.city || "",
                    pincode: user.pincode || ""
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    
 
    const [token,setToken] = useState(localStorage.getItem("token") || "" ) 

    const fetchProducts = async () =>{
        try {
            const response = await axios.post(backend_url+"/api/product/list")
            if (response.data.success) {
                setProducts(response.data.products)
            }else{
                console.log(response.data);
            }} catch (error) {
            console.log(error.message);
        }
    }

    const addCart = async ({productId,quantity}) => {
        try {
            
            if (!token) {
                return toast.error("Please login...")
            }

            const response = await axios.post(backend_url+'/api/cart/addcart',{productId,quantity},{headers:{token}})
            console.log(response.data);
            
            if (response.data.success) {
                
                toast.success("product added to cart.")
                setCartData((prev)=>({...prev,[productId]:(prev[productId]|| 0 )+ quantity}))
            }
            else{
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
            
        }
    }

    const fetchCart = async () => {
        try {
            if (!token)  return

            const response = await axios.post(backend_url+'/api/cart/getcart',{},{headers:{token}})
            console.log(response.data.cartData);

            if (response.data.success) {
                setCartData(response.data.cartData)
                setDataLoaded(true)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const updateCart = async (productId,quantity) =>{
        try {
            const response = await axios.post(backend_url+"/api/cart/updatecart",{productId,quantity},{headers:{token}})

            if (response.data.success) {
                setCartData(prev=>({
                    ...prev,[productId]:quantity
                }))
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
            
        }
    }

    useEffect(()=>{
        fetchProducts()
    },[])


    useEffect(()=>{
        if (token) {
            fetchCart()
        }
    },[token])

    const data={
        currency,deliveryFee,backend_url,token,setToken,products,search,setSearch,showSearch,setShowSearch,qty,setQty,addCart,cartData,setCartData,
        updateCart,dataLoaded,form,setForm,fetchProfile
}

    return ( 
        <DataContext.Provider value={data}> 
            {props.children}
        </DataContext.Provider>
    )
}


export default DataContextProvider;