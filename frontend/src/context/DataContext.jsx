import { createContext,useEffect,useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DataContext=createContext()

const DataContextProvider = (props) =>{

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
    const [userData,setUserData] = useState(null)

    const [userLocation,setUserLocation]= useState(null)
    const [locationName,setLocationName] = useState(localStorage.getItem("location") || "")
    const [locationDenied,setLocationDenied]=useState(false)
    const [selectedCity,setSelectedCity]=useState(localStorage.getItem('selectedCity') || "")
    const [cities,setCities]=useState([])
    const [showLocationModal,setShowLocationModal]=useState(false);
    
    const [nearbyProducts,setNearbyProducts] = useState([])

    const [token,setToken] = useState(localStorage.getItem("token") || "" ) 


    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: ""
    })

    const getUserLocation = () => {

        if (!navigator.geolocation) {
            return   
        }

        navigator.geolocation.getCurrentPosition(

            async (position)=>{

                try {

                const latitude = position.coords.latitude
                const longitude = position.coords.longitude
                console.log(latitude,longitude);
                
                
                setUserLocation({latitude,longitude}) 
                setLocationDenied(false)

                const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`) 

                const address = response.data.address;

                const city = address.city || address.town || address.village || address.county || "unknown location";
                
                console.log(city);

                setLocationName(city)

                localStorage.setItem('location',city)
                    
                } catch (error) {
                    console.log(error.message);
                    
                }

        }, (error)=>{
            console.log(error);
            setLocationDenied(true)
            toast.error("location permission denied")
        })
    }

    const fetchCities = async () => {
        try {
            
            const response = await axios.get(backend_url + "/api/stores/cities");
            
            if (response.data.success) {

                setCities(response.data.cities);
                
            }

        } catch (error) {
            console.log(error.message);
        }
    }



    const fetchProfileData = async () => {
        try {
            
            const res = await axios.post(backend_url+ "/api/profile/getprofile",{},{headers:{token}})
            
            if (res.data.success) {
                setUserData(res.data.user)
            }
            else{
                console.log(res.data.message);
            }


        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchProfile = async () => { 
        try {
            const res = await axios.post(backend_url + "/api/profile/getprofile",{},{headers:{token}})
            
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


    const fetchProducts = async () => {
        try {
            
            if (userLocation || selectedCity) {
                
                const payload= userLocation ? {latitude:userLocation.latitude,longitude:userLocation.longitude} : {city:selectedCity}
                
                const response = await axios.post(backend_url+'/api/product/nearbyproducts',payload)

                if (response.data.success) {
                    setProducts(response.data.products)
                }
                else{
                    toast.error("something went wrong")
                }
            }
            else{
                
                const response = await axios.post(backend_url+"/api/product/list")
                
                if (response.data.success) {
                    setProducts(response.data.products)
                }else{
                    
                    console.log(response.data);
                }
            }

        } catch (error) {
            console.log(error.message);
            toast.error(error.message)

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
        getUserLocation();
    },[])



    useEffect(()=>{
        if (token) {
            fetchCart()
            fetchProfileData();
        }
    },[token])

    useEffect(() => {
        fetchCities();

    }, []);

    useEffect(() => {
        
        fetchProducts();

    }, [userLocation,selectedCity]);

    const data={
        currency,deliveryFee,backend_url,token,setToken,products,search,setSearch,showSearch,setShowSearch,qty,setQty,addCart,cartData,setCartData,
        updateCart,dataLoaded,form,setForm,fetchProfile,userData,setUserData,userLocation,locationName,setLocationName,locationDenied,getUserLocation,
        cities,selectedCity,setSelectedCity,showLocationModal,setShowLocationModal,
    
    }

    return ( 
        <DataContext.Provider value={data}>
            {props.children}
        </DataContext.Provider>
    )
}


export default DataContextProvider;