import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'

const List = () => {

  const [list,setList] = useState([])

  const fetchData = async () =>{
    try {

      const response = await axios.post(backendUrl+'/api/product/list')

      console.log(response.data);
      

    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchData()
  },[])


  return (
    <div>
      
    </div>
  )
}

export default List